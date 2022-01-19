module.exports = class MessageDto {
   id;
   creator;
   dialog;
   content;
   createdAt;
   constructor(msg) {
      this.id = msg._id;
      this.creator = msg.creator;
      this.dialog = msg.dialog;
      this.content = msg.content;
      this.createdAt = msg.createdAt;
   }
}