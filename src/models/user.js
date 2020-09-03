'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = Schema({
    nickname: String,
    password: String

})


//define coleccion el primer parametro del mongoose.model
module.exports = mongoose.model('AdminUser', UserSchema)