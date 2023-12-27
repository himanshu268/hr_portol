const express = require('express');
const router = express.Router();
const request = require('../../models/requesttimeoff');
const checklogin = require('../../middleware/checklogin');

router.get("/pending_request",checklogin,async(req,res)=>{
    try{
        
        const pending= await request.find({status:"pending"}).sort({ Date: -1 });
        res.status(200).json({
            status_code: 200,
            message: 'Request timeoff applied successfully',
            data: pending,
          });
    }
    catch(error){
        console.error('Error in getting pending request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }

})
module.exports = router;
