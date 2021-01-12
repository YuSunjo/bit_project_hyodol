const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('../models');
const config = require('./config')
const client = require('twilio')(config.accountSID, config.authToken)
const customerController = require('./controllers/customer.ctrl');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', customerController.findAllCustomer);

router.get('/write', (req, res) => {
    res.render('customer/customerWrite.html')
})


router.post('/write', customerController.writeCustomer );

router.get('/detail/:id', (req,res, next) => {
    //req.params.id
    try{
        models.twiliouser.findByPk(req.params.id).then( (customer) => {
            res.render('customer/detail.html', { customer })
        })
    }catch(error){
        next(error)
    }
    
});

router.get('/edit/:id', customerController.findByPk);

router.post('/edit/:id', customerController.updateCustomer);

router.get('/delete/:id', customerController.deleteCustomer);

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
    res.render('customer/error.html', {message: '틀렸습니다. 다시 작성해주세요'});
})


module.exports = router;