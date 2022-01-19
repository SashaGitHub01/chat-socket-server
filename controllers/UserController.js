const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

class UsersController {
   reg = async (req, res, next) => {
      try {
         const { username, email, password } = req.body;
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return next(ApiError.badReq('Данныее введены некорректно', errors))
         }

         const candidate = await User.findOne({ email });

         if (candidate) return next(ApiError.badReq('Пользователь с такой почтой уже существует'))

         const hash = await bcrypt.hash(password, 5)

         const data = {
            username,
            email,
            avatar: 'https://res.cloudinary.com/twitter-uploads/image/upload/v1638945837/Avatars/corhyulgwhglo9bdkz4i.jpg',
            password: hash
         }

         const userModel = await User.create(data);
         const token = jwt.sign({ id: userModel._id }, process.env.SECRET_KEY);

         res.cookie('TOKEN', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

         return res.json({
            data: userModel
         })

      } catch (err) {
         return next(err)
      }
   }

   login = async (req, res, next) => {
      try {
         const { email, password } = req.body;
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return next(ApiError.badReq('Неверный логин или пароль', errors))
         }

         const candidate = await User.findOne({ email });

         if (!candidate) return next(ApiError.badReq('Неверный логин или пароль'))

         const isEquals = await bcrypt.compare(password, candidate.password)

         if (!isEquals) return next(ApiError.badReq('Неверный логин или пароль'))

         const token = jwt.sign({ id: candidate._id }, process.env.SECRET_KEY);

         res.cookie('TOKEN', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

         return res.json({
            data: candidate
         })

      } catch (err) {
         return next(err)
      }
   }

   auth = async (req, res, next) => {
      try {
         const user = req.user;

         return res.json({
            data: user
         })
      } catch (err) {
         return next(err)
      }
   }

   logout = async (req, res, next) => {
      try {
         res.clearCookie('TOKEN')

         return res.json({
            data: 1
         })
      } catch (err) {
         return next(err)
      }
   }

   getAll = async (req, res, next) => {
      try {
         const users = await User.find();

         return res.json({
            data: users
         })
      } catch (err) {
         return next(err)
      }
   }

   getOne = async (req, res, next) => {
      try {
         const { id } = req.params
         const user = await User.findById(id);

         return res.json({
            data: user
         })
      } catch (err) {
         return next(err)
      }
   }
}

module.exports = new UsersController();