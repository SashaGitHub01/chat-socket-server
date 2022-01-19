const { Server } = require("socket.io");
const User = require('../models/User')


module.exports = (http) => {
   const io = new Server(http, {
      cors: {
         origin: 'http://localhost:3000',
         credentials: true
      }
   })

   io.on('connection', (socket) => {
      socket.on('DIALOG:JOIN', (id) => {
         socket.join(id)
         console.log(socket.rooms)
      })

      socket.on('ONLINE', async (id) => {

      })

      socket.on('disconnect', () => {
         console.log('dis')
      })
   })

   return io.sockets;
}