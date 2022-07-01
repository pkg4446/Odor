const express = require('express');
const mqtt    = require('../controller/device/mqtt');
const router  = express.Router();

router.post('/',async function(req) {
        return await mqtt.extra(req.body);  
    });

module.exports = router;