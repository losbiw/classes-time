const express = require('express');
const path = require('path');
const User = require('../modules/userSchema');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('login', {msg: ''});
});

router.get('/messageRecovery', (req, res)=>{
    res.render('message', {title: "Recovery", msg: "We've sent a recovery link on your email"});
});

router.get('/message', (req, res)=>{
    res.render('message', {title: 'Confirm', msg: "We've sent a confirmation message on your email"});
});

router.post('/', async (req, res)=>{
    const users = await User.find();
    const check = users.some(user => user.email === req.body.email);
    if(check){
        const currentUser = users.filter(user => user.email === req.body.email);
        if(req.body.password === currentUser[0].password){
            if(currentUser[0].isConfirmed === true){
                return res.redirect(`/user/${currentUser[0].id}`);
            } else{
                res.render('login', {msg: 'Confirm your email'});
            }     
        } else{
            res.render('login', {msg: 'The password is wrong'});
        }
    } else{
        res.render('login', {msg: 'The user doesnt exist'});
    }
});

module.exports = router;