const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const resignation = require("../../models/resignation");
const { check, validationResult } = require('express-validator');


router.get('/resignation', checklogin, async (req, res) => {
    if (req.user.admin === "yes") {

        try {
            const resignation_id = req.header('resignation_id');

            const resignations = await resignation.find({ status_hr: "pending",  status_it_manager: "approve" }).sort({ Date: -1 });
            res.status(200).json({
                status_code: 200,
                message: 'Team resignation history retrieved successfully',
                data: resignations
            });
        } catch (error) {
            console.error('Error retrieving resignation history:', error);
            res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });
        }
    }
    if (req.user.admin === "manager") {

        try {
            const resignation_id = req.header('resignation_id');

            const resignations = await resignation.find({ status_it_manager: "pending" }).sort({ Date: -1 });
            res.status(200).json({
                status_code: 200,
                message: 'Team resignation history retrieved successfully',
                data: resignations
            });
        } catch (error) {
            console.error('Error retrieving resignation history:', error);
            res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });
        }
    }
    
});

router.get("/resignation/action/", checklogin, async (req, res) => {
    if (req.user.admin === "yes") {
        try {
            const resignation_id = req.header('resignation_id');

            const resignation = await resignation.findById(resignation_id);
            return res.json({ resignation })
        }
        catch (error) {
            console.error('Error', error);
            return res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });
        }
    }
    if (req.user.admin === "manager") {
        try {
            const resignation_id = req.header('resignation_id');

            const resignation = await resignation.findById(resignation_id);
            return res.json({ resignation })
        }
        catch (error) {
            console.error('Error', error);
            return res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });
        }
    }
    
    else {
        return res.status(403).json({
            status_code: 403,
            message: 'You are not authorized to perform this action',
            data: ''
        });
    }
});


router.post('/resignation/action/approve', checklogin, async (req, res) => {
    if (req.user.admin === "yes") {

        // const comment = req.body.comment;
        try {
            const resignation_id = req.header('resignation_id');
            const check = await resignation.findById(resignation_id);
            const update = {}
            // if(comment){update.comment=comment};
            update.Status_hr = "approve";
            const resignation = await resignation.findByIdAndUpdate(resignation_id, { $set: update }, { new: true })
            return res.json({ resignation })
        }
        catch (error) {
            console.error(error.message)
            return res.status(500).send("internal server error")


        }


    }
    if (req.user.admin === "manager") {
        try {
            const resignation_id = req.header('resignation_id');
            const check = await resignation.findById(resignation_id);
            const update = {}
            // if(comment){update.comment=comment};
            update.Status_it_manager = "approve";
            const resignation = await resignation.findByIdAndUpdate(resignation_id, { $set: update }, { new: true })
            return res.json({ resignation })
        }
        catch (error) {
            console.error(error.message)
            return res.status(500).send("internal server error")


        }

    }
    
    else {
        return res.status(403).send("You are not authorized to perform")

    }



})


router.post('/resignation/action/reject', checklogin, async (req, res) => {
    if (req.user.admin === "yes") {
        const resignation_id = req.header('resignation_id');

        // const comment = req.body.comment;
        try {
            const check = await resignation.findById(resignation_id);
            
            const update = {}
            // if(comment){update.comment=comment};
            update.status_hr = "reject";
            const resignation = await resignation.findByIdAndUpdate(resignation_id, { $set: update }, { new: true })
            return res.json({ resignation })
        }
        catch (error) {
            console.error(error.message)
            return res.status(500).send("internal server error")


        }


    }
    if (req.user.admin === "manager") {
        const resignation_id = req.header('resignation_id');

        // const comment = req.body.comment;
        try {
            const check = await resignation.findById(resignation_id);
            
            const update = {}
            // if(comment){update.comment=comment};
            update.Status_it_manager = "reject";
            const resignation = await resignation.findByIdAndUpdate(resignation_id, { $set: update }, { new: true })
            return res.json({ resignation })
        }
        catch (error) {
            console.error(error.message)
            return res.status(500).send("internal server error")


        }


    }
    
    else {
        return res.status(403).send("You are not authorized to perform")

    }



})

module.exports = router;
