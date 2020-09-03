const express = require('express')

const userRouter = express.Router()


//controller
const userController = require('../controllers/user')

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)




module.exports = userRouter