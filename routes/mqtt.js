const express = require('express');
const mqtt    = require('../controller/device/mqtt');
const router  = express.Router();

router.post('/',async function(req,res) {
        res.json(await mqtt.extra(req.body)); 
    });

router.post('/plazma',async function(req,res) {
        ////DeviceID, Commend
        res.json(await mqtt.send(req.body.DeviceID, req.body.Commend)); 
    });

module.exports = router;