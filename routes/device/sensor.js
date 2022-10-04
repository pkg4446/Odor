const express   = require('express');
const requestIp = require('request-ip');
const devices    = require('../../controller/device/devices');
const sensor    = require('../../controller/device/sensor');

const router  = express.Router();

router.post('/log',async function(req, res, next) {    
    const response = {
        result: true,
        data:   null,
    }
    try {
        const DATA      = req.body;
        DATA.TMPR       *= 1;
        DATA.HMDT       *= 1;
        DATA.CD         *= 1;
        DATA.AMN        *= 1;
        DATA.HYD_SLF    *= 1;
        DATA.OZN        *= 1;
        DATA.MTHN       *= 1;
        DATA.VOCS       *= 1;

        axiosData = {
            token:    "safemotion",
            macAdd:   DATA.MD_ID,
            TMPR:     DATA.TMPR,
            HMDT:     DATA.HMDT,
            CD:       DATA.CD,
            AMN:      DATA.AMN,
            HYD_SLF:  DATA.HYD_SLF,
            CO2:      DATA.OZN,
            MTHN:     DATA.MTHN,
            VOCS:     DATA.VOCS,
            IP:       requestIp.getClientIp(req),
          }
      
          console.log(axiosData);
      
          const axios = require('axios');

          await axios({
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            method: "post", // 요청 방식
            url: "https://plasmaapi.smarthive.work/api/daesung/sensor/", // 요청 주소
            data: axiosData,
          })
          .then(function(res){
            response.data = res.data;
            console.log(response);
          });
          
/*
        const data = {
            IP:     requestIp.getClientIp(req),
            MD_ID:  req.body.MD_ID,
        } 
        const device = await devices.sensor_read(data.MD_ID);
        if(device){
            if(device.IP != data.IP) await devices.IP_update(data);
        }else{
            await devices.sensor_junction(data);
        }        
        response.data = await sensor.log(req.body);
*/
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/recent',async function(req, res, next) {
    const response = {
        result: true,
        data:   null,
    }
    try {
        response.data = await sensor.readOne(req.body.MD_ID);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

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

router.post('/setup',async function(req, res, next) {         
    const response = {
        result: true,
        data:   null,
    }
    try {
        
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