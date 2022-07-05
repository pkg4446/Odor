const express       = require('express');
const router        = express.Router();

const web           = require('./web');
const map           = require('./application/map');
const sensor        = require('./device/sensor');
const plasma        = require('./device/plasma');
const mqtt          = require('./mqtt');

router.use('/',web);
router.use('/mqtt',mqtt);

router.use('/map',map);

router.use('/plasma',plasma);
router.use('/sensor',sensor);

module.exports  = router;