const { join } = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(express.static(join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/account', require('./routes/account'));
app.use('/timetable', require('./routes/timetable'));

app.listen(PORT, () => console.log(`The server is listening to the port ${PORT}`));

app.get('/*', (req, res)=>{
    res.sendFile(join(__dirname, 'build', 'index.html'));
});

mongoose.connect(process.env.CONNECT, () => 
    console.log('The database is connected')    
);