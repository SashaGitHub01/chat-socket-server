const Message = require('../models/Message')
const Dialog = require('../models/Dialog');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

class DialogsController {
   getAll = async (req, res, next) => {
      try {
         const user = req.user;

         const dialogs = await Dialog.find({ members: { $in: user.id } })
            .populate('lastMessage members')

         let result;

         if (dialogs) {
            result = dialogs.map((d) => {
               const parthner = d.members.filter(({ id }) => id !== user.id)[0];
               d.parthner = parthner;

               return d;
            })
         }

         return res.json({
            data: result
         })

      } catch (err) {
         next(err)
      }
   }

   getOne = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;

         const dialog = await Dialog.findOne({
            $and: [{ members: { $in: user.id } }, { members: { $in: id } }]
         }).populate([
            { path: 'members' },
            { path: 'messages', populate: { path: 'creator' } }
         ])

         if (!dialog) return next(ApiError.notFound())

         return res.json({
            data: dialog
         })

      } catch (err) {
         next(err)
      }
   }

   delete = async (req, res, next) => {
      try {
         const user = req.user;
         const { id } = req.params;

         if (!id) return next(ApiError.notFound());

         return res.json({
            data: 'message'
         })

      } catch (err) {
         next(err)
      }
   }
}

module.exports = new DialogsController();