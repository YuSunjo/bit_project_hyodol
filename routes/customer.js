const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('../models');
const config = require('./config')
const client = require('twilio')(config.accountSID, config.authToken)



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

router.get('/delete/:id', (req, res) => {
    models.twiliouser.destroy({
        where : {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/customer');
    })
})

router.get('/register', (req, res) => {
    res.render('customer/register.html');
});

var phonenumber
router.post('/phone', (req,res) => {
    phonenumber = req.body.phone
    console.log(phonenumber, req.body)
    client  
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to:`+${phonenumber}`,
            channel: 'sms'
        }).then((data) => {
            res.redirect('/customer/register');
        })
})
// router.get('/phone', (req, res) => {

// })

router.post('/auth', (req, res) => {
    console.log(phonenumber)
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to:`+${phonenumber}`,
            code: req.body.auth
        }).then( (data) => {
            // res.status(200).send(data);
            console.log(data.valid);
            if(data.valid === true){
                res.redirect('/customer');
            }else{
                res.redirect('/customer/register/err')
 
            }
        })
})

router.get('/register/err', (req, res) => {
    res.render('customer/error.html');
})


module.exports = router;