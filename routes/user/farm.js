const express = require('express');
const farm    = require('../../controller/user/farm');

const router  = express.Router();

router.post('/regist', async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {        
        response.data = await farm.create(req.body);
    } catch (error) {   
        response.result = false; 
        next(error);    
    }     
    res.json(response);
});

router.post('/modify', async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {        
        response.data = await farm.update(req.body);
    } catch (error) {   
        response.result = false; 
        next(error);    
    }     
    res.json(response);
});

router.post('/list', async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {        
        response.data = await farm.list(req.body.FARM_ID);
    } catch (error) {   
        response.result = false; 
        next(error);    
    }     
    res.json(response);
});

router.post('/remove', async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {        
        response.result = await farm.delete(req.body.FARM_ID);        
    } catch (error) {   
        response.result = false; 
        next(error);    
    }     
    res.json(response);
});

module.exports = router;