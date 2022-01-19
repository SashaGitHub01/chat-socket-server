const { Router } = require('express');
const extractJwt = require('../middleware/extractJwt');
const MessagesController = require('../controllers/MessagesController')

module.exports = (io) => {
   const messagesRouter = Router();

   const messagesCtrl = new MessagesController(io)

   messagesRouter.post('/:id', extractJwt, messagesCtrl.create)
   messagesRouter.delete('/:id', extractJwt, messagesCtrl.delete)

   return messagesRouter;
}