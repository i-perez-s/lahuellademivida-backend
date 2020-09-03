const express = require('express')

const difusserRouter = express.Router()
const diffuserController = require('../controllers/difusser')
const multipart = require('connect-multiparty')
var multipartyMiddelware = multipart({uploadDir: './uploads'})



difusserRouter.post('/diffuser/create', diffuserController.create)
difusserRouter.get('/diffuser/products', diffuserController.showMessages)
difusserRouter.delete('/diffuser/delete/:id', diffuserController.deleteMessage)
difusserRouter.get('/diffuser/find-product/:id?', diffuserController.getProject)
difusserRouter.put('/diffuser/update-product/:id', diffuserController.updateProject)
difusserRouter.post('/diffuser/uploadImage/:id', multipartyMiddelware, diffuserController.uploadFile)
difusserRouter.get('/diffuser/getImage/:image', diffuserController.getImageFile)


module.exports = difusserRouter