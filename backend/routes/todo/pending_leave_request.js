const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const Leave = require("../../models/leave");
const { check,validationResult } = require('express-validator');

router.get('/leave', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;

        const leaves = await Leave.find({ status: "pending" }).sort({ "Date": -1 })
        res.status(200).json({
            status_code: 200,
            message: 'Team Leave history retrieved successfully',
            data: leaves
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

router.get("/leave/action/:id", checklogin, async (req, res) => {
    if (req.user.admin === "yes") {
        try {
            const leave = await Leave.findById(req.params.id);
            return res.json({ leave })
        }
        catch (error) {
            console.error('Error', error);
            return res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });
        }
    } else {
        return res.status(403).json({
            status_code: 403,
            message: 'You are not authorized to perform this action',
            data: ''
        });
    }
});

const validateLeaveId = [
    check('leave_id').notEmpty().withMessage('leave_id is required'),
];

const performLeaveAction = async (req, res, status) => {
    if (req.user.admin !== "yes") {
        return res.status(403).json({
            status_code: 403,
            message: 'You are not authorized to perform this action',
            data: ''
        });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status_code: 400,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    const leave_id = req.header('leave_id');
    const comment = req.body.comment;

    try {
        const update = {};
        if (comment) {
            update.comment = comment;
        }
        update.status = status;

        const leave = await Leave.findByIdAndUpdate(leave_id, { $set: update }, { new: true })
        return res.json({ leave });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
};

router.post('/leave/action/approve', checklogin, validateLeaveId, async (req, res) => {
    return performLeaveAction(req, res, 'Approve');
});

router.post('/leave/action/reject', checklogin, validateLeaveId, async (req, res) => {
    return performLeaveAction(req, res, 'reject');
});

module.exports = router;
