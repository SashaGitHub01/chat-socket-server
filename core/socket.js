const { Server } = require("socket.io");


module.exports = (http) => {
   const io = new Server(http, {
      cors: {
         origin: 'http://localhost:3000',
         credentials: true
      }
   })

   let onlineUsers = [];

   const addUser = (id, socket) => {
      if (!onlineUsers.includes(user => user.id === id)) {
         onlineUsers.push({ id, socket });
      }
   }

   const removeUser = (socket) => {
      const i = onlineUsers.findIndex((user) => user.socket === socket);

      if (i) onlineUsers.splice(i, 1);
   }

   const getUser = (id) => {
      return onlineUsers.find(user => user.id === id)
   }

   io.on('connection', (socket) => {
      socket.on('DIALOG:JOIN', (id) => {
         socket.join(id)
      })

      socket.on('USER:ONLINE', async (id) => {
         addUser(id, socket.id)
         io.emit('USER:SET_ONLINE')
      })

      socket.on('USER:CHECK', async (id, callback) => {
         const user = getUser(id);

         if (user) {
            callback(true)
         } else {
            callback(false)
         }
      })

      socket.on('SEND:MESSAGE', async (creatorId, userId, content) => {
         const receiver = getUser(userId);

         if (receiver) {
            io.to(receiver.socket).emit('GET:MESSAGE', { creatorId, userId, content })
         }
      })

      socket.on('disconnect', () => {
         console.log('dis')
         io.emit('USER:OFFLINE')
         removeUser(socket.id);

      })
   })

   return io.sockets;
}