const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    // res.send('customer');
    // res.render('alzheimer/alzheimer.html');
    models.alzheimer.findAll({
        limit : 15
    }).then( (alzheimer) => {
        res.render('alzheimer/alzheimer.html', { alzheimer });
    })
})


module.exports = router;