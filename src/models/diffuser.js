'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KitSchema = Schema({
    name: String,
    characteristics: String,
    shortDescription: String,
    image: String

})
//define coleccion el primer parametro del mongoose.model
module.exports = mongoose.model('diffuser', KitSchema)