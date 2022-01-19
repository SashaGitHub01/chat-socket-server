const { Router } = require('express');
const extractJwt = require('../middleware/extractJwt');
const messagesCtrl = require('../controllers/MessagesController');
const DialogsCtrl = require('../controllers/DialogsController');

const dialogsRouter = Router();

dialogsRouter.get('/', extractJwt, DialogsCtrl.getAll)
dialogsRouter.get('/:id', extractJwt, DialogsCtrl.getOne)
dialogsRouter.post('/:id', extractJwt, DialogsCtrl.getAll)
dialogsRouter.delete('/:id', extractJwt, DialogsCtrl.delete)

module.exports = dialogsRouter;