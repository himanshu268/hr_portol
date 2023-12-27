const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const leaves = require("../../models/leave");
const checklogin = require('../../middleware/checklogin');

// Route to retrieve leave details by ID
router.get('/action', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;
        const leave =req.header('leave_id');

        

        if (!leave) {
            return res.status(404).json({ status_code: 404, message: 'Leave not found', data: '' });
        }

        if (leave.user_id.toString() !== userId) {
            return res.status(401).json({ status_code: 401, message: 'Unauthorized', data: '' });
        }

        res.status(200).json({
            status_code: 200,
            message: 'Leave details retrieved successfully',
            data: leave
        });
    } catch (error) {
        console.error('Error retrieving leave details:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

// Route to cancel leave by ID
router.delete('/cancel', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;
        const leave =req.header('leave_id');

        if (!leave) {
            return res.status(404).json({ status_code: 404, message: 'Leave not found', data: '' });
        }

        if (leave.user_id.toString() !== userId) {
            return res.status(401).json({ status_code: 401, message: 'Unauthorized', data: '' });
        }

        const deletedLeave = await leaves.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status_code: 200,
            message: 'Leave has been cancelled',
            data: deletedLeave
        });
    } catch (error) {
        console.error('Error while cancelling leave:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

module.exports = router;
