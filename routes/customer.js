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

router.get('/detail/:id', (req,res) => {
    //req.params.id
    models.twiliouser.findByPk(req.params.id).then( (customer) => {
        res.render('customer/detail.html', { customer })
    } )
});

router.get('/edit/:id', (req, res) => {
    models.twiliouser.findByPk(req.params.id).then( (customer) => {
        res.render('customer/write.html', { customer });
    })
})

router.post('/edit/:id', (req, res) => {
    models.twiliouser.update({
        name: req.body.name,
        phone: req.body.phone
    },{
        where : {id : req.params.id}
    }).then( () => {
        res.redirect('/customer/detail/' + req.params.id);
    })
})

module.exports = router;