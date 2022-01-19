module.exports = class DialogDto {
   id;
   members;
   messages;
   lastMessage;
   parthner

   constructor(dialog) {
      this.id = dialog._id;
      this.members = dialog.members;
      this.parthner = dialog.parthner;
      this.messages = dialog.messages;
      this.lastMessage = dialog.lastMessage
   }
}