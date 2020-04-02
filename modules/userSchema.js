const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    form: String,
    email: String,
    password: String,
    theme: String,
    isConfirmed: Boolean
});

module.exports = mongoose.model('UserProps', newUser);

