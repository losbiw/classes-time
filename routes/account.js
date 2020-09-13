const fetch = require('node-fetch');
const router = require('express').Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const convertCharCode = require('../modules/char');
const getUserEmail = require('../modules/email');
const User = require('../models/UserSchema');

const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

router.post('/login', async(req, res) => {
    const login = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    
    const warning = login?.isConfirmed ? ''
                    : login?.form ? 'Confirm your email'
                    : 'The login data in incorrect'; 

    if(!warning){
        const { form, theme, isAudioEnabled, isAdmin, email, password } = login;

        const request = await fetch(
            `http://localhost:${PORT}/timetable/${form}`
        );
        const json = await request.json();
        const timetable = JSON.parse(json);
        
        userData = {
            auth: {
                email: email,
                password: password
            },
            general: {
                form: convertCharCode(form, false),
                theme: theme,
                isAdmin: isAdmin,
                isAudioEnabled: isAudioEnabled
            },
            form: timetable
        }

        if(!timetable)
            userData.warning = "The form doens't exist"
    }
    else{
        userData = {
            warning: warning
        }
    }

    res.json(JSON.stringify(userData));
});

router.get('/confirm/:id', async(req, res) => {
    const { id } = req.params;
    const currentUser = await User.findById(id);

    if(currentUser){
        currentUser.isConfirmed = true;
        await currentUser.save();
    }

    res.redirect(`http://localhost:${PORT}/`);
});

router.post('/signup', async(req, res) => {
    const { form, email, password } = req.body;
    let data;

    const userExists = await User.findOne({ email: email });
    if(userExists){
        data = {
            warning: 'The user already exists'
        }
    }
    else{
        const newUser = new User({
            form: convertCharCode(form, true),
            email: email,
            password: password 
        });
        
        await newUser.save((err, res) => {
            if(err) throw err;
        });

        const mail = {
            to: email,
            subject: 'Confirm your account',
            html: getUserEmail(newUser.id)
        }
        transporter.sendMail(mail);

        data = {
            warning: 'Confirm your email'
        }
    }
    
    res.json(JSON.stringify(data));
});

router.put('/form', async(req, res) => {
    const { email, password, form } = req.body;

    const update = await User.findOne({
        email: email,
        password: password
    });

    update.form = convertCharCode(form, true);
    await update.save();

    res.json(JSON.stringify(update));
});

module.exports = router;