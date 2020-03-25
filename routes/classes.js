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
module.exports = router;
