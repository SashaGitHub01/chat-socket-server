const { Schema, model } = require('mongoose');
const MessageDto = require('../dtos/MessageDto');

const MessageSchema = new Schema({
   creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
   },

   content: {
      type: String,
      required: true
   },

   dialog: {
      type: Schema.Types.ObjectId,
      ref: "Dialog"
   },
}, { timestamps: true })

MessageSchema.set('toJSON', {
   transform: (doc, ret) => {
      return new MessageDto(ret)
   }
})

module.exports = model('Message', MessageSchema);