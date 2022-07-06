const express   = require('express');
const devices   = require('../../controller/device/devices');

const router  = express.Router();

router.post('/read',async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {
        response.data = await devices.plasma_read(req.body.MD_ID);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/list',async function(req, res, next) {         
    const response = {
        result: true,
        data:   null,
    }
    try {
        const data = {
            MD_TYPE:    true,
            USERID:     req.body.USERID
        } 
        response.data = await devices.list(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/regist',async function(req, res, next) {   
    const response = {
        result: true,
        data:   null,
    }
    try {
        const data = {
            MD_ID:      req.body.MD_ID,
            MD_TYPE:    true,
            USERID:     req.body.USERID
    
        }   
        response.data = await devices.junction_update(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

module.exports = router;