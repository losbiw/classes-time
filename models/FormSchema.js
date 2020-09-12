const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    form: String,
    schedule: Array,
    timetable: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Form', FormSchema);