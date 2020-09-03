'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = Schema({
    name: String,
    mail: String,
    message: String,
    category: String

})
//define coleccion el primer parametro del mongoose.model
module.exports = mongoose.model('contactMessage', ContactSchema)