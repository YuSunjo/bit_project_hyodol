const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    // res.send('customer');
    // res.render('alzheimer/alzheimer.html');
    models.alzheimer_test.findAll({
        limit : 15
    }).then( (alzheimer_test) => {
        res.render('alzheimer/alzheimer.html', { alzheimer_test });
    })
})


module.exports = router;