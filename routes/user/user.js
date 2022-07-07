const express = require('express');
const user    = require('../../controller/user/user');

const router  = express.Router();

router.post('/login',async function(req, res, next) {
    const response = {
        result: false,
        data:   null,
    }
    try {        
        const data = {
            USER_ID:    req.body.USER_ID,
            USER_PASS:  req.body.USER_PASS
        }
        const pass = await user.passCheck(data);
        if(pass){
            response.result = true;
            response.data   = await user.info(data);
        }
    } catch (error) {   
        next(error);     
    }     
    res.json(response);
});

module.exports = router;