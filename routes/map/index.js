const express   = require('express');
const router    = express.Router();

const map       = require('./map');

router.use('/',map);

module.exports  = router;