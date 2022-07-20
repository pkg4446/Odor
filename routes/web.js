const express = require('express');
const path    = require('path');
const views   = path.join(__dirname, '../views/');

const router  = express.Router();

router.get('/',function(req, res, next) {
    res.sendFile(views + "index.html");
    });

router.get('/device',function(req, res, next) {
    res.sendFile(views + "plasma.html");
    });

router.get('/adress',function(req, res, next) {
    res.sendFile(views + "kakao.html");
    });

module.exports = router;