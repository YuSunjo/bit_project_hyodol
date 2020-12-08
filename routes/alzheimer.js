const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('customer');
    res.render('alzheimer/alzheimer.html');
})


module.exports = router;