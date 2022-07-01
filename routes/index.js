const express   = require('express');

const web     = require('./web');
const mqtt     = require('./mqtt');

const router    = express.Router();

router.use('/',web);
router.use('/mqtt',mqtt);

module.exports  = router;