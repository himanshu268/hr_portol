const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const Leave = require('../../models/leave');  // Make sure to change the model name to 'Leave'

router.get('/history', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Find all leaves with the specified user_id and sort by the 'from' field in ascending order
        const leaves = await Leave.find({ user_id: userId }).sort({ from: 1 });

        res.status(200).json({
            status_code: 200,
            message: 'Leave history retrieved successfully',
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

module.exports = router;
