const { body } = require('express-validator')

module.exports = [
   body('username')
      .isString()
      .isLength({
         min: 2,
         max: 25
      })
      .withMessage('Имя должно содержать от 2 до 25 символов'),

   body('email')
      .isString()
      .isEmail()
      .withMessage('Incorrect email')
      .isLength({
         min: 5,
         max: 30
      })
      .withMessage('Имя должно содержать от 5 до 30 символов'),

   body('password')
      .isString()
      .isLength({
         min: 3,
         max: 20
      })
      .withMessage('Пароль должен содержать от 3 до 20 символов')
]