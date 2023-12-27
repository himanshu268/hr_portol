const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const loan = require("../../models/loan");
const checklogin = require('../../middleware/checklogin');

// Validation middleware
router.get("/allloan", checklogin, async (req, res) => {
if (req.user.admin === "manager" || req.user.admin ==="yes") {

    try {
        const loan = await loan.find().sort({ Date: -1 });

        res.status(200).json({
            status_code: 200,
            message: 'Team loan retrieved successfully',
            data: loan
        });
    } catch (error) {
        console.error('Error retrieving team loan history:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
}
});
router.get("/allloan/view", checklogin, async (req, res) => {
    try {
        const loan_id = req.header('loan_id');
        const loan = await loan.findById({loan_id}).sort({ Date: -1 });

        res.status(200).json({
            status_code: 200,
            message: 'Team loan retrieved successfully',
            data: loan
        });
    } catch (error) {
        console.error('Error retrieving team loan history:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

router.post('/loan/action/approve', checklogin, async (req, res) => {
    if (req.user.admin === "manager") {
        try {
            const loan_id = req.header('loan_id');
            const check = await loan.findById(loan_id);
            const update = {}
            // if(comment){update.comment=comment};
            update.status = "Approve";
            const loan = await loan.findByIdAndUpdate(loan_id, { $set: update }, { new: true })
            return res.json({ loan })
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


router.post('/loan/action/reject', checklogin, async (req, res) => {
    if (req.user.admin === "manager") {
        try {
            const loan_id = req.header('loan_id');
            const check = await loan.findById(loan_id);
            const update = {}
            // if(comment){update.comment=comment};
            update.status = "reject";
            const loan = await loan.findByIdAndUpdate(loan_id, { $set: update }, { new: true })
            return res.json({ loan })
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
