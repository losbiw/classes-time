const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodeMailer = require('nodemailer');
const ejs = require('ejs');

if (process.env.NODE_ENV !== 'production') { require('dotenv/config') }

const User = require('../modules/userSchema');
const router = express.Router();

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.post('/', async (req, res)=>{
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    });
    const newUser = new User({
        form: req.body.form,
        email: req.body.email,
        password: req.body.password,
        theme: 'lightMode',
        isConfirmed: false
    });
    
    const userData = {
        email: newUser.email, 
        id: newUser._id
    };
    
    const users = await User.find();
    const notAvailable = users.some(user => user.email === newUser.email); 
    if(!notAvailable){
        const createUser = await newUser.save();
        
        ejs.renderFile(path.join(__dirname, '../views/confirm.ejs'), userData, (err, data)=>{
            if(err) throw err;
            const mailOptions = {
                from: process.env.email,
                to: newUser.email,
                subject: 'Password Confirmation',
                html: data
            };
            transporter.sendMail(mailOptions, (err, data)=>{
                if(err) throw err;
            });
        });
        
        return res.redirect('/login');
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
