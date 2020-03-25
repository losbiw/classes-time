const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('../modules/userSchema');
const router = express.Router();

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.post('/', async (req, res)=>{
    const newUser = new User({
        form: req.body.form,
        email: req.body.email,
        password: req.body.password,
        theme: 'lightMode'
    });
    const users = await User.find();
    const notAvailable = users.some(user => user.email === newUser.email); 
    if(!notAvailable){
        const createUser = await newUser.save();
        return res.redirect(`/user/${createUser.id}`);
    } else{
        res.render('signup', {msg: 'The user already exists'});
    }
});

router.patch('/', async (req, res)=>{
    const updatedUser = await User.updateOne(
        {_id: req.body.id}, 
        { $set: {theme: req.body.theme}});
});

module.exports = router;