const Message = require('../models/Message')
const Dialog = require('../models/Dialog');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

module.exports = class MessagesController {
   io;

   constructor(io) {
      this.io = io
   }

   create = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;
         const { content } = req.body;
         let candidate;

         if (!content) return next(ApiError.badReq('Данные некорректны'))

         candidate = await Dialog.findOne({
            $and: [{ members: { $in: id } }, { members: { $in: user.id } }]
         })

         if (!candidate) {
            candidate = await Dialog.create({ members: [id, user.id], parthner: id })

            await User.findByIdAndUpdate(user.id, { $push: { dialogs: candidate.id } })
            await User.findByIdAndUpdate(id, { $push: { dialogs: candidate.id } })
         }

         const data = {
            creator: req.user.id,
            content,
            dialog: candidate.id
         }

         const message = await Message.create(data).then(msg => msg.populate('creator'))

         candidate.messages.push(message.id);
         candidate.lastMessage = message.id;
         await candidate.save();

         res.json({
            data: message
         })

         this.io.to(candidate.id).emit('MESSAGE:ADD', message)
      } catch (err) {
         next(err)
      }
   }

   delete = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;
         const { messageId } = req.body;

         const message = await Message.findById(messageId);

         if (!message) return next(ApiError.notFound());

         await Dialog.findOneAndUpdate({
            $and: [{ members: { $in: id } }, { members: { $in: user.id } }]
         }, { $pull: { messages: messageId } })

         message.remove();
         message.save();

         return res.json({
            data: message
         })

      } catch (err) {
         next(err)
      }
   }
}