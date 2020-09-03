'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KitSchema = Schema({
    name: String,
    content: String,
    bestCustomers: String,
    image: String

})
//define coleccion el primer parametro del mongoose.model
module.exports = mongoose.model('kit', KitSchema)