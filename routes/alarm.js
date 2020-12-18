const express = require('express');
const { ModelBuildInstance } = require('twilio/lib/rest/autopilot/v1/assistant/modelBuild');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    // res.send('customer');
    // res.render('alarm/alarm.html');
    models.medicinecheck.findAll({
        limit : 5
    }).then( (medicinecheck) => {
        res.render('alarm/alarm.html', { medicinecheck });
    })
})


module.exports = router;