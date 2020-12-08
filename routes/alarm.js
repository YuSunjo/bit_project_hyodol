const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('customer');
    res.render('alarm/alarm.html');
})


module.exports = router;