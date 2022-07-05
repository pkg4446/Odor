const express   = require('express');
const requestIp = require('request-ip');
const modules    = require('../../controller/device/modules');
const sensor    = require('../../controller/device/sensor');

const router  = express.Router();

router.post('/read',async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {
        response.data = await sensor.read(req.body.MD_ID);
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
            MD_TYPE:    false,
            USERID:     req.body.USERID
        } 
        response.data = await modules.list(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/log',async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {
        response.data = await sensor.log(req.body);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/setup',async function(req, res, next) {         
    const response = {
        result: true,
        data:   null,
    }
    try {
        const data = {
            IP:     requestIp.getClientIp(req),
            MD_ID:  req.body.MD_ID,
        } 
        response.data = await modules.sensor_junction(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/reset',async function(req, res, next) {       
    const response = {
        result: true,
        data:   null,
    }
    try {
        const data = {
            MD_ID:      req.body.MD_ID,
            MD_TYPE:    false,
            USERID:     "null"
        }       
        response.data = await modules.junction_update(data);
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
            IP:     requestIp.getClientIp(req),
            USERID: req.body.USERID,
        } 
        response.data = await modules.junction_IP(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

module.exports = router;