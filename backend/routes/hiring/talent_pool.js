const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const create_pool = require("../../models/create_pool");
const add_cand = require("../../models/add_cand");

const checklogin = require('../../middleware/checklogin');

router.post("/create_pool",checklogin,async(req,res)=>{
    try{
        const create_  = await  create_pool .create({
            username: req.user.username,
            user_id: req.user.user.id,
            create_pool_name:req.body.name,
          });
          res.status(200).json({
            status_code: 200,
            message: 'talent pool created successfully',
            data: create_
        });
    }
    catch(error){
        console.error('Error creating pool', error);

        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });

    }

});

router.get('/talent_pool',checklogin,async(req,res)=>{
    try {
        const userId = req.user.user.id;

        // Find all create_pools with the specified user_id and sort by the 'Date' field in descending order
        const create_pools = await create_pool.find().sort({ Date: -1 });

        res.status(200).json({
            status_code: 200,
            message: ' pools  retrieved successfully',
            data: create_pools
        });
    } catch (error) {
        console.error('Error retrieving pools :', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});
router.post("/talent_pool/candidate_list",checklogin,async(req,res)=>{
    try{
        const talent=req.header("talent_pool")
        const list = await Leave.find({ talent_pool: talent }).sort({ from: 1 });

          res.status(200).json({
            status_code: 200,
            message: 'pool team  retrieved successfully',
            data: list
        });
    }
    catch(error){
        console.error('Error retrieving team pool', error);

        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });

    }

});
router.post("/add_candidate",checklogin,async(req,res)=>{
    try{
        const talent=req.header("talent_pool")
        const create_  = await  add_cand .create({
            username: req.user.username,
            user_id: req.user.user.id,
            talent_pool:talent,
            emp_name:req.body.name,
            DOA:req.body.date,
            dep:req.body.dept,
            des:req.body.designation,
            performance:req.body.performance,
            rating:req.body.rating,
            desc:req.body.desc,
          });
          res.status(200).json({
            status_code: 200,
            message: 'candidated added successfully',
            data: create_
        });
    }
    catch(error){
        console.error('Error in adding candidate', error);

        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });

    }

});


module.exports = router;
