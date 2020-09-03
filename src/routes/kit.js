const express = require('express')

const kitRouter = express.Router()
const kitController = require('../controllers/kit')
const multipart = require('connect-multiparty')
var multipartyMiddelware = multipart({uploadDir: './uploads'})



kitRouter.post('/kit/create', kitController.create)
kitRouter.get('/kit/products', kitController.showMessages)
kitRouter.delete('/kit/delete/:id', kitController.deleteMessage)
kitRouter.get('/kit/find-product/:id?', kitController.getProject)
kitRouter.put('/kit/update-product/:id', kitController.updateProject)
kitRouter.post('/kit/uploadImage/:id', multipartyMiddelware, kitController.uploadFile)
kitRouter.get('/kit/getImage/:image', kitController.getImageFile)


module.exports = kitRouter