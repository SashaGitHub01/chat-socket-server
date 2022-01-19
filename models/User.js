const { Schema, model, SchemaTypes, SchemaType } = require('mongoose');
const UserDto = require('../dtos/UserDto');

const UserSchema = new Schema({
   username: {
      type: String,
      unique: true,
      required: true,
      minlength: 2
   },

   password: {
      type: String,
      required: true,
      minlength: 3
   },

   email: {
      type: String,
      required: true,
      minlength: 5
   },

   avatar: {
      type: String,
   },

   dialogs: {
      default: [],
      type: [{ type: Schema.Types.ObjectId, ref: 'Dialog' }]
   },
})

UserSchema.set('toJSON', {
   transform: (doc, ret) => {
      return new UserDto(ret);
   }
})

module.exports = model('User', UserSchema);