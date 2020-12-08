const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => {
    // res.send('customer');
    res.render('customer/customer.html');
})

router.post('/', (req, res) => {
    res.send(req.body)
})
module.exports = router;