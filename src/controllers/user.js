'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const { param } = require('../routes/user');
const { find, findByIdAndDelete, findByIdAndRemove, model } = require('../models/user');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { error } = require('console');
mongoose.set('useFindAndModify', false);

var secretKey = 'yaizan'

var controller = {
    register: async function(req, res){

        const { nickname, password } = req.body;
        const newUser = new User({nickname, password});
        await newUser.save();
            const token = await jwt.sign({_id: newUser._id}, 'secretkey');
        res.status(200).json({token});

    },
    login: async function(req, res){
        const { nickname, password } = req.body;

        const user = await User.findOne({nickname});
        if (!user) return res.status(401).send('The email doen\' exists');
        if (user.password !== password) return res.status(401).send('Wrong Password');

            const token = jwt.sign({_id: user._id}, 'secretkey');

        return res.status(200).json({token});

    }
}

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}


module.exports = controller