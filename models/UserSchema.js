const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    form: String,
    theme: { type: String, default: 'light' },
    isAudioEnabled: { type: Boolean, default: true },
    isConfirmed: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);