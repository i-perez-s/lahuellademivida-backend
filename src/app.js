'use strict'

const express = require('express')
const bodyParser = require('body-parser')

var app = express()

//cargar archivos rutas
const contactMessageRoutes = require('./routes/contactMessage')
const oilRoutes = require('./routes/oil')
const kitRoutes = require('./routes/kit')
const diffuserRoutes = require('./routes/diffuser')
const UserRoutes = require('./routes/user')
const user = require('./models/user')



//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//cors


// Configurar cabeceras y cors
app.use((req, res, next) => {
    //Dominio que tengan acceso (ej. 'http://example.com')
   res.setHeader('Access-Control-Allow-Origin', '*');
    //Metodos de solicitud que deseas permitir
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //Encabecedados que permites (ej. 'X-Requested-With,content-type')
   res.setHeader('Access-Control-Allow-Headers', '*');

    next();
})


//rutas
app.use('/', contactMessageRoutes)
app.use('/', oilRoutes)
app.use('/', kitRoutes)
app.use('/', diffuserRoutes)
app.use('/user', UserRoutes)

app.use(express.json())


module.exports = app