module.exports = class ApiError extends Error {
   status;
   errors;

   constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
   }

   static unauthorized() {
      return new ApiError(401, 'Пользователь не авторизован')
   }

   static badReq(message, err) {
      return new ApiError(400, message)
   }

   static notFound() {
      return new ApiError(404, 'Обьект не найден')
   }

   static internal() {
      return new ApiError(500, 'Ошибка сервера')
   }
}