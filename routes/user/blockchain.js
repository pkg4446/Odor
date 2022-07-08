const express = require('express');
const user    = require('../../funtion/blockchain');

const router  = express.Router();

router.post('/',async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {        
        response.data = await user.test(req.body);
    } catch (error) {   
        response.result = false; 
        next(error);    
    }     
    res.json(response);
});
module.exports = router;