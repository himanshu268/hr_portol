const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const Leave = require('../../models/leave');  // Note: Change the model name to 'Leave'

// Route to retrieve team leave history
router.get('/team_leave', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Find all leaves with the specified user_id and sort by the 'Date' field in descending order
        const leaves = await Leave.find().sort({ Date: -1 });

        res.status(200).json({
            status_code: 200,
            message: 'Team Leave history retrieved successfully',
            data: leaves
        });
    } catch (error) {
        console.error('Error retrieving team leave history:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

module.exports = router;
