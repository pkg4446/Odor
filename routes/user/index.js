const express   = require('express');
const router    = express.Router();

const user      = require('./user');
const farm      = require('./farm');

router.use('/',user);
router.use('/farm',farm);

module.exports  = router;