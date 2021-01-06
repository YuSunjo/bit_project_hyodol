const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => {
    // res.send('customer');
    // res.render('alarm/alarm.html');
    models.medicinecheck.findAll({
        limit : 5,
        order : [['Date','DESC']],
    }).then( (medicinecheck) => {
        res.render('alarm/alarm.html', { medicinecheck });
    })
})

router.get('/calendar', (req, res) => {

    models.medicinecheck.findAll({
    }).then( (medicinecheck) => {
        res.render('alarm/alarm_calendar.html', { medicinecheck });
    })
})

router.post('/calendar', (req, res) => {
    console.log(req.body)
    models.medicinecheck.findAll({
        where : { Date: req.body.datepicker }
    }).then((medicinecheck) => {
        res.render('alarm/alarm_calendar.html', { medicinecheck });
    })
})


module.exports = router;