const express = require('express');
const path = require('path');
const User = require('../modules/userSchema');
const router = express.Router();

router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (req, res)=>{
    res.redirect('/login');
});

router.get('/:id', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/:id/getData', async (req, res)=>{
    const userToSend = await User.find({_id: req.params.id});
    res.json(userToSend[0]);
});

router.get('/:id/getClasses', async (req, res)=>{
    const user = await User.find({_id: req.params.id});
    const classes = require(`../public/classes/${user[0].form}`);
    res.json(classes);
});

router.get('/:id/confirm', async (req, res)=>{
    res.render('congratulations', {text: 'Your account is confirmed'});
})

router.patch('/:id/confirm', async (req, res) =>{
    const confirmedUser = await User.updateOne(
        {_id: req.params.id},
        {$set: {isConfirmed: true}}
    );
});

router.get('/:id/recovery', (req, res)=>{
    res.render('newPasswordInput');
});

router.post('/:id/recovery', async (req, res)=>{
    const user = await User.updateOne(
        {_id: req.params.id},
        {$set: {password: req.body.password}}
    );
    res.render('congratulations', {text: 'Your password was succesfully changed'});
});

module.exports = router;
