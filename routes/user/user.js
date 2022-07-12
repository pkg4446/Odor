const express = require('express');
const user    = require('../../controller/user/user');

const router  = express.Router();

router.post('/login',async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {        
        const data = {
            USER_ID:    req.body.USER_ID,
            USER_PASS:  req.body.USER_PASS
        }
        const pass = await user.passCheck(data);
        if(pass){            
            response.data   = await user.info(data);
        }else{
            response.result = false;
        }
    } catch (error) {   
        response.result = false; 
        next(error);    
    }     
    res.json(response);
});

router.post('/join',async function(req, res, next) {    
    const response = {
        result: true,
        data:   null,
    }
    for(const key of Object.keys(req.body)){
        if(!req.body[key]){
            
        console.log(req.body[key]);
            response.result = false;
            response.data   = "null";
        }
    }
    console.log(req.body);
    try {        
        if(response.result){ 
            response.data   = await user.join(req.body);   
        }else{
            response.result = false;
        }
    } catch (error) {   
        response.result = false; 
        next(error);    
    }     
    res.json(response);
});

module.exports = router;