const express = require('express')

const contactRouter = express.Router()


//controller
const controller = require('../controllers/contactMessage')


contactRouter.post('/contact/create', controller.create)
contactRouter.get('/contact/doubts', controller.getDoubts)
contactRouter.get('/contact/orders', controller.getOrders)
contactRouter.get('/contact/others', controller.showOthers)
contactRouter.delete('/contact/delete/:id', controller.deleteMessage)

module.exports = contactRouter