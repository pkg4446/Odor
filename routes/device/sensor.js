const express   = require('express');
const requestIp = require('request-ip');
const regist    = require('../../controller/device/regist');

const router  = express.Router();

router.post('/regist',async function(req, res, next) {
    const data = {
        IP:     requestIp.getClientIp(req),
        USERID: req.body.USERID,
    }      
    const response = {
        result: true,
        data:   null,
    }

    try {
        response.data = await regist.junction_IP(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

router.post('/regist',async function(req, res, next) {
    const data = {
        IP:     requestIp.getClientIp(req),
        USERID: req.body.USERID,
    }      
    const response = {
        result: true,
        data:   null,
    }

    try {
        response.data = await regist.junction_IP(data);
    } catch (error) {
        response.result = false;
        next(error);
    }
    res.json(response);
});

module.exports = router;