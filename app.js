const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
<<<<<<< HEAD

if (process.env.NODE_ENV !== 'production') { require('dotenv/config') }
=======
if (process.env.NODE_ENV !== 'production') { require('dotenv/config'); }
>>>>>>> c8b02adf5987020f08fc5f396c43aa6fb18e5d92

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
console.log(process.env.CONNECTION);

app.listen(PORT, ()=>{
    console.log(`The server is listening on the port ${PORT}`);
});
