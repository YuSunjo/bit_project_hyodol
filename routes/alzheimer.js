const express = require('express');
const router = express.Router();
const models = require('../models');

const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => {
    // res.send('customer');
    // res.render('alzheimer/alzheimer.html');
    models.alzheimer_list.findAll({
        limit : 15
    }).then( (alzheimer_list) => {
        res.render('alzheimer/alzheimer.html', { alzheimer_list});
    })
})

router.get('/detail/:Date', (req, res) => {
    models.alzheimer_test.findAll({
        where : { Date: req.params.Date } 
    }).then((alzheimer_test) => {
        res.render('alzheimer/alzheimer_detail.html', { alzheimer_test })
    })
})


router.post('/calendar', (req, res) => {
    console.log(req.body);
    models.alzheimer_test.findAll({
        where: {Date: req.body.datepicker}
    }).then((alzheimer_test) => {
        res.render('alzheimer/alzheimer_calendar.html',{alzheimer_test})
    })

})

module.exports = router;