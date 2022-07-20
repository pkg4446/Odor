const express   = require('express');
const smell     = require('../../funtion/smell');
const router  = express.Router();

router.route('/')
    .post(async (req,res,next)  =>{
        const response = {
            result: true,
            data:   null,
        }
        try {
            response.data = await smell.report(req.body);
        } catch (error) {
            response.result = false;
            next(error);
        }
        res.json(response);
    });

router.post('/get', async function(req, res, next) {
        const response = {
            result: true,
            data:   null,
        }
        try {
            response.data = await smell.read(req.body);
        } catch (error) {
            response.result = false;
            next(error);
        }
        res.json(response);
    });

module.exports = router;