'use strict'

const mongoose = require('mongoose');
const Message = require('../models/contactMessage');
const { param } = require('../routes/contactMessage');
const { find, findByIdAndDelete, findByIdAndRemove, model } = require('../models/contactMessage');
const fs = require('fs');
const path = require('path');
mongoose.set('useFindAndModify', false);

var controller = {
    create: function(req, res){
        var message = new Message()

        var params = req.body
        message.name = params.name
        message.mail = params.mail
        message.message = params.message
        message.category = params.category

        message.save((err, messageStorage) => {
            if(err) return res.status(500).send({message: "error al guardar el mensaje"})

            if(!messageStorage) return res.status(404).send({message: "no se ha podido guardar el mensaje"})

            return res.status(200).send({message: messageStorage})
        })
    },

    getDoubts: function(req, res){
        Message.find({category:'dudas'}).exec((err, messages) => {
            if (err) return res.status(500).send({message: 'error al sacar los mensajes'})
            if (!messages) return res.status(404).send({message: 'no hay mensajes disponibles'})

            return res.status(200).send({messages})
        })
    },

    getOrders: function(req, res){
        Message.find({category:'pedido'}).exec((err, messages) => {
            if (err) return res.status(500).send({message: 'error al sacar los mensajes'})
            if (!messages) return res.status(404).send({message: 'no hay mensajes disponibles'})

            return res.status(200).send({messages})
        })
    },

    showOthers: function(req, res){
        Message.find({category:'otros'}).exec((err, messages) => {
            if (err) return res.status(500).send({message: 'error al sacar los mensajes'})
            if (!messages) return res.status(404).send({message: 'no hay mensajes disponibles'})

            return res.status(200).send({messages})
        })
    },

    deleteMessage: function(req, res){
        var id = req.params.id
        Message.findByIdAndRemove(id, (err, messageRemoved) => {
            if (err) return res.status(500).send({message: 'error al intentar eliminar proyecto'})

            if (!messageRemoved) return res.status(404).send({message: 'no existe el proyecto solicitado a eliminar'})

            return res.status(200).send({
                project: messageRemoved
            })
        })
    }
}


module.exports = controller