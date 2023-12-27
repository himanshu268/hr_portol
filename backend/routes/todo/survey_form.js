const express = require('express');
const router = express.Router();
const survey = require("../../models/surveyform");
const checklogin = require('../../middleware/checklogin');

  router.post('/survey',checklogin,async(req,res)=>{

    try{
        const surveyform=await survey.create({

            username: req.user.username,
            user_id: req.user.user.id,
            Q1:req.body.Q1,
            Q2:req.body.Q2,
            Q3:req.body.Q3,
            Q4:req.body.Q4,
        });
        console.log(surveyform);
        res.status(200).json({
            status_code: 200,
            message: 'Survey uploaded successfully',
            data: surveyform
        });
    } catch (error) {
        console.error('Error uploading survey:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});
module.exports = router