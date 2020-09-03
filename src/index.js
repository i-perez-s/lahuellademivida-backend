'use strict'

const mongoose = require('mongoose')
const app = require('./app')
var port = process.env.PROT || 5800

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://zehcnas:yaizan2020@cluster0.5mlxv.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true })
        .then(() => {
            console.log('conexion a la vase de datos establecida')
            //creacion del server

            app.listen(port, () => {
                console.log('server arrancado en el puerto ' + port)
            })
        })
        .catch(err => console.log(err))