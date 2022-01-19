const { Router } = require('express')
const extractJwt = require('../middleware/extractJwt');
const registration = require('../validators/reg');
const login = require('../validators/login');
const userCtrl = require('../controllers/UserController');

const userRouter = Router();

userRouter.get('/logout', userCtrl.logout)
userRouter.get('/auth', extractJwt, userCtrl.auth)
userRouter.post('/login', login, userCtrl.login)
userRouter.post('/registration', registration, userCtrl.reg);
userRouter.get('/', userCtrl.getAll)
userRouter.get('/:id', userCtrl.getOne)

module.exports = userRouter