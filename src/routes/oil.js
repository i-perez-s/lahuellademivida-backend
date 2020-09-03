const express = require('express')

const oilsRouter = express.Router()
const oilcontroller = require('../controllers/oils')
const multipart = require('connect-multiparty')
var multipartyMiddelware = multipart({uploadDir: './uploads'})



oilsRouter.post('/oil/create', oilcontroller.create)
oilsRouter.get('/oil/products', oilcontroller.showMessages)
oilsRouter.delete('/oil/delete/:id', oilcontroller.deleteMessage)
oilsRouter.get('/oil/find-product/:id?', oilcontroller.getProject)
oilsRouter.get('/oil/getSinergias/', oilcontroller.getSinergias)
oilsRouter.get('/oil/getSimples/', oilcontroller.getSimples)
oilsRouter.put('/oil/update-product/:id', oilcontroller.updateProject)
oilsRouter.post('/oil/uploadImage/:id', multipartyMiddelware, oilcontroller.uploadFile)
oilsRouter.get('/oil/getImage/:image', oilcontroller.getImageFile)


module.exports = oilsRouter