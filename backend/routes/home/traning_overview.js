const express = require('express');
const router = express.Router();
const Training = require("../../models/training");
const checklogin = require('../../middleware/checklogin');

router.get('training',checklogin,async(req,res)=>{
    try{
        const userId=req.user.user.id;
        const training=await Training.findById({user_id:userId});
        res.status(200).json({
            status_code: 200,
            message: 'Leave history retrieved successfully',
            data: training
        });
    } catch (error) {
        console.error('Error retrieving leave history:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

module.exports = router;
