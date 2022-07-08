const express   = require('express');
const requestIp = require('request-ip');
const devices    = require('../../controller/device/devices');
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
            FARM_ID:    req.body.FARM_ID
        } 
        response.data = await devices.list(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/logging',async function(req, res, next) {
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
        response.data = await devices.sensor_read(data);
        if(response.data){
            if(response.data.IP != IP)  response.data = await devices.IP_update(data);
        }else{
            response.data = await devices.sensor_junction(data);
        }
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
            FARM_ID:    "null"
        }       
        response.data = await devices.junction_update(data);
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
            IP:         requestIp.getClientIp(req),
            FARM_ID:    req.body.FARM_ID,
        } 
        response.data = await devices.junction_IP(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

module.exports = router;