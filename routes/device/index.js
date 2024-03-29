const express   = require('express');
const router    = express.Router();

const plasma    = require('./plasma');
const sensor    = require('./sensor');

router.use('/',plasma);
router.use('/sensor',sensor);

module.exports  = router;