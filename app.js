const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') { require('dotenv/config') }

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    return res.redirect('/login');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/user', require('./routes/classes'));

mongoose.connect(process.env.CONNECTION, {useNewUrlParser: true}, ()=>console.log('The database is connected'));

app.listen(PORT, ()=>{
    console.log(`The server is listening on the port ${PORT}`);
});