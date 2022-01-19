const { Schema, model } = require('mongoose');
const DialogDto = require('../dtos/DialogDto');

const DialogSchema = new Schema({
   members: [{ type: Schema.Types.ObjectId, ref: "User" }],

   messages: {
      default: [],
      type: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
   },

   lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
   },

}, { timestamps: true, toObject: { virtuals: true } })

DialogSchema.set('toJSON', {
   transform: (doc, ret) => {
      return new DialogDto(ret)
   },

   virtuals: true
});

DialogSchema.virtual('parthner', {
   ref: 'User',
   localField: 'members',
   foreignField: '_id',
   justOne: true,
})

module.exports = model('Dialog', DialogSchema);