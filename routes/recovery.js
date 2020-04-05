const express = require('express');
const path = require('path');
const User = require('../modules/userSchema');
const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('requestRecovery', {error: ''});
});

router.post('/', async (req, res)=>{
    const users = await User.find();
    const user = users.some(user => user.email === req.body.email);
    if(user){
        const currentUser = users.filter(user => user.email === req.body.email);
        
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.pass
            }
        });

        const userData = {
            id: currentUser[0]._id,
            text: 'Recovery your password',
            action: 'recovery'
        }

        ejs.renderFile(path.join(__dirname, '../views/confirm.ejs'), userData, (err, data)=>{
            if(err) throw err;
            const mailOptions = {
                from: process.env.email,
                to: currentUser[0].email,
                subject: 'Password Recovery',
                html: data
            }
            transporter.sendMail(mailOptions);
        });

        return res.redirect('/login/messageRecovery');
    } else{
        return res.render('requestRecovery', {error: 'No user with such an email'});
    }
});

module.exports = router;