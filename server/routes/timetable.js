const router = require('express').Router();
const mongoose = require('mongoose');
const convertCharCode = require('../modules/char');
const schema = require('../models/FormSchema');

router.get('/:form', async(req, res) => {
    const form = await schema.findOne({ 
        form: req.params.form 
    });
    
    const userData = form ? {
        timetable: form.timetable,
        schedule: form.schedule,
        form: convertCharCode(form.form, false)
    } : null;
    res.json(JSON.stringify(userData));
})

router.post('/', async(req, res) => {
    const data = req.body;
    const keys = Object.keys(data);
    data.form = convertCharCode(data.form, true);
    let timetable = await schema.findOne({ form: data.form });
    
    if(timetable){
        for(key of keys){
            timetable[key] = data[key]
        }
    }
    else timetable = new schema(data);

    await timetable.save((err, res) => {
        if(err) throw err;
    })
    res.json(JSON.stringify(timetable));
})

module.exports = router;