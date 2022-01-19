module.exports = class UserDto {
   id;
   dialogs;
   username;
   email;
   avatar;

   constructor(user) {
      this.dialogs = user.dialogs;
      this.id = user._id;
      this.username = user.username;
      this.email = user.email
      this.avatar = user.avatar
   }
}