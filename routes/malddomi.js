const express = require('express');
const router = express.Router();

router.get('/', (req, res,next) => {
    try{
        res.status(200).render('malddomi/malddomi.html');
    }catch(error){
        console.error(error);
        next(error);
    }
    
})

module.exports = router;