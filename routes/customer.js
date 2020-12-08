const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('../models');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => {
    // res.send('customer');
    // res.render('customer/customer.html');
    models.twiliouser.findAll({

    }).then( (customers) => {
        res.render('customer/customer.html', { customers: customers })
    })
})

router.post('/', (req, res) => {
    // res.send(req.body)
    // models.twiliouser.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }).then( () => {
    //     res.redirect('/customer')
    // })
    models.twiliouser.create(req.body).then( () => {
        res.redirect('/customer')
    })
})
module.exports = router;