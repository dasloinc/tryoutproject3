const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');


const signToken = userID => {
    return JWT.sign({
        iss : "to.gather",
        sub : userID
    }, "to.gather", {expiresIn : "1h"});
}

userRouter.post('/signup', (req,res) => {
    const { firstname, lastname, email, password } = req.body;
    User.findOne({email}, (err,user) => {
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError : true}});
        if(user)
            res.status(400).json({message : {msgBody : "email is already taken", msgError : true}});
        else{
            const newUser = new User({firstname, lastname, email, password})
            newUser.save(err => {
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError : true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError : false}});
            });
        }
    });
});

userRouter.post('/', passport.authenticate('local',{session : false}), (req,res) => {
    if (req.isAuthenticated()){
        const {_id,email} = req.user;
        const token = signToken(_id);
        //important that the token wont be stolen
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated : true, user : {email}});
    }  
});

userRouter.get('/logout', passport.authenticate('jwt',{session : false}), (req,res) => {
    res.clearCookie('access_token');
    console.log('from logout')
    res.json({user:{email : "", success : true}});  
});

// userRouter.post('/mainapp', passport.authenticate('jwt',{session : false}), (req,res) => {
//     const mainapp = new MainApp (req.body);
//     mainapp.save(err => {
//         if (err)
//             res.status(500).json({message : {msgBody : "Error has occured", msgError : true}});
//         else{
//             req.user.todos.push(mainapp);
//             req.user.save(err => {
//                 if (err)
//                     res.status(500).json({message : {msgBody : "Error has occured", msgError : true}});
//                 else
//                     res.status(200).json({message : {msgBody : "successful created todo", msgError : false}});
//             });
//         }
//     })
// });

// userRouter.get('/mainapp', passport.authenticate('jwt',{session : false}), (req,res) => {
//     User.findById({_id : req.user._id}).populate('todos').exec((err, document) => {
//         if(err)
//             res.status(500).json({message : {msgBody : "Error has occured", msgError : true}});
//         else{
//             res.status(200).json({todos : document.todos, authenticated : true});
//         }
//     });
// });

// userRouter.get('/admin', passport.authenticate('jwt',{session : false}), (req,res) => {
//     if(req.user.role === admin){
//         res.status(200).json({message : {msgBody : 'You ar an admin', msgError : false}});
//     }
//     else
//         res.status(403).jason({message : {msgBody : 'You are not an admin, not allowed to access', msgError : true}});
// });

userRouter.get('/authenticated', passport.authenticate('jwt',{session : false}), (req,res) => {
    const {email} = req.user;
    res.status(200).json({isAuthenticated : true, user : {email}});
});

module.exports = userRouter;