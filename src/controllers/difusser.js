'use strict'

const mongoose = require('mongoose');
const Diffuser = require('../models/diffuser');
const { param } = require('../routes/diffuser');
const { find, findByIdAndDelete, findByIdAndRemove, model } = require('../models/diffuser');
const fs = require('fs');
const path = require('path');
mongoose.set('useFindAndModify', false);

var controller = {
    create: function(req, res){
        var diffuser = new Diffuser()

        var params = req.body
        diffuser.name = params.name
        diffuser.characteristics = params.characteristics
        diffuser.shortDescription = params.shortDescription
        diffuser.image = null

        diffuser.save((err, messageStorage) => {
            if(err) return res.status(500).send({message: "error al guardar el mensaje"})

            if(!messageStorage) return res.status(404).send({message: "no se ha podido guardar el mensaje"})

            console.log(messageStorage)
            return res.status(200).send({message: messageStorage})
        })
    },
    showMessages: function(req, res){
        Diffuser.find().exec((err, messages) => {
            if (err) return res.status(500).send({message: 'error al sacar los mensajes'})
            if (!messages) return res.status(404).send({message: 'no hay mensajes disponibles'})

            return res.status(200).send({messages})
        })
    },
    deleteMessage: function(req, res){
        var id = req.params.id
        Diffuser.findByIdAndRemove(id, (err, messageRemoved) => {
            if (err) return res.status(500).send({message: 'error al intentar eliminar proyecto'})

            if (!messageRemoved) return res.status(404).send({message: 'no existe el proyecto solicitado a eliminar'})

            return res.status(200).send({
                Diffuser: messageRemoved
            })
        })
    },
    getProject: function(req, res){
		var projectId = req.params.id;

		if(projectId == null) return res.status(404).send({message: 'El proyecto no existe.'});

		Diffuser.findById(projectId, (err, project) => {

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

        Diffuser.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
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
                Diffuser.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
                    if (err) return res.status(500).send({message: 'error al intentar subir el archivo'})

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

//5f463c5e423724158cf8ac80
