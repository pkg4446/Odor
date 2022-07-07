const express       = require('express');
const router        = express.Router();

const web           = require('./web');
const mqtt          = require('./mqtt');

const device        = require('./device');
const map           = require('./map');
const user           = require('./user');

router.use('/',web);
router.use('/mqtt',mqtt);

router.use('/device',device);
router.use('/map',map);
router.use('/user',user);

module.exports  = router;