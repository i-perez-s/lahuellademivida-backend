'use strict'

const mongoose = require('mongoose');
const Oil = require('../models/oil');
const { param } = require('../routes/oil');
const { find, findByIdAndDelete, findByIdAndRemove, model } = require('../models/contactMessage');
const fs = require('fs');
const path = require('path');
mongoose.set('useFindAndModify', false);

var controller = {
    create: function(req, res){
        var oil = new Oil()

        var params = req.body
        oil.name = params.name
        oil.type = params.type
        oil.shortDescription = params.shortDescription
        oil.description = params.description
        oil.image = null

        oil.save((err, messageStorage) => {
            if(err) return res.status(500).send({message: "error al guardar el mensaje"})

            if(!messageStorage) return res.status(404).send({message: "no se ha podido guardar el mensaje"})

            console.log(messageStorage)
            return res.status(200).send({message: messageStorage})
        })
    },
    showMessages: function(req, res){
        Oil.find().exec((err, messages) => {
            if (err) return res.status(500).send({message: 'error al sacar los mensajes'})
            if (!messages) return res.status(404).send({message: 'no hay mensajes disponibles'})

            return res.status(200).send({messages})
        })
    },
    getSinergias: function(req, res){
        Oil.find({type: 'sinergias'}).exec((err, messages) => {
            if (err) return res.status(500).send({message: 'error al sacar los mensajes'})
            if (!messages) return res.status(404).send({message: 'no hay mensajes disponibles'})

            return res.status(200).send({messages})
        })
    },
    getSimples: function(req, res){
        Oil.find({type: 'simple'}).exec((err, messages) => {
            if (err) return res.status(500).send({message: 'error al sacar los mensajes'})
            if (!messages) return res.status(404).send({message: 'no hay mensajes disponibles'})

            return res.status(200).send({messages})
        })
    },
    deleteMessage: function(req, res){
        var id = req.params.id
        Oil.findByIdAndRemove(id, (err, messageRemoved) => {
            if (err) return res.status(500).send({message: 'error al intentar eliminar proyecto'})

            if (!messageRemoved) return res.status(404).send({message: 'no existe el proyecto solicitado a eliminar'})

            return res.status(200).send({
                oil: messageRemoved
            })
        })
    },
    getProject: function(req, res){
		var projectId = req.params.id;

		if(projectId == null) return res.status(404).send({message: 'El proyecto no existe.'});

		Oil.findById(projectId, (err, project) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!project) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				project
			});

		});
    },
    updateProject: function(req, res){
        var projectId = req.params.id
        var update = req.body

        Oil.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
            if (err) return res.status(500).send({message: 'error al intentar actualizar los datos'})
            if (!projectUpdated) return res.status(404).send({message: 'no existe el proyecto solicitado'})
            return res.status(200).send({project: projectUpdated})
        })
    },
    uploadFile: function(req, res){
        var projectId = req.params.id
        var fileName = 'imagen no subida...'

        if(req.files){
            var filePath = req.files.image.path
            var fileSplit = filePath.split('\\')
            var fileName = fileSplit[1]
            var extSplit = fileName.split('\.')
            var fileExt = extSplit[1]

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'svg' || fileExt == 'JPG'){
                Oil.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
                    if (err) return res.status(500).send({message: 'error al intentar subir el archivo' + err})

                    if (!projectUpdated) return res.status(404).send({message: 'no existe el archivo'})

                    return res.status(200).send({
                        project: projectUpdated
                    })
                })
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'la extension no es valida'})
                })
            }

        }else{
            return res.status(200).send({
                message: fileName
            })
        }
    },
    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/' + file
        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({message:'no existe la foto'})
            }
        })
    },

}

module.exports = controller
