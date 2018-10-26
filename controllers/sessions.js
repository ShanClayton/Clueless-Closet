const express = require('express');
const session = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');


session.delete('/', function(req, res){
    req.session.destroy(function(){
        res.status(200).json({
            status:200,
            message:'logout complete'
        });
    });
})


session.post('/', function(req, res){
    User.findOne({ username: req.body.username }, function(err, foundUser){
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            res.status(201).json({
                status:201,
                message:'session created'
            });
        } else {
            res.status(401).json({
                status:401,
                message:'login failed'
            });
        }
    });
});


module.exports = session;
