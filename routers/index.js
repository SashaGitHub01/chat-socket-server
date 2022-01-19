const { Router } = require('express');
const dialogsRouter = require('./dialogsRouter');
const createMessagesRouter = require('./messagesRouter');
const usersRouter = require('./userRouter');

module.exports = (io) => {
   const router = Router();

   const messagesRouter = createMessagesRouter(io)

   router.use('/users', usersRouter)
   router.use('/messages', messagesRouter)
   router.use('/dialogs', dialogsRouter)

   return router;
}