const express   = require('express');
const smell     = require('../../funtion/application/smell');
const router  = express.Router();

router.route('/')
    .get(async (req, res, next) => {
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
    })
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

module.exports = router;