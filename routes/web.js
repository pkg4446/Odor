const express = require('express');
const path    = require('path');
const views   = path.join(__dirname, '../views/');

const router  = express.Router();

router.get('/',function(req, res, next) {
    res.sendFile(views + "index.html");
    });

module.exports = router;