const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const Leave = require('../../models/leave');

router.get('/balance', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Find all leaves with the specified user_id and sort by the 'from' field in ascending order
        const leaves = await Leave.find({ user_id: userId }).sort({ from: 1 });

        // Calculate leave balance by category
        const categoryBalance = leaves.reduce((balanceDict, leave) => {
            const { category, from, to } = leave;

            // Calculate duration in milliseconds
            const durationMs = new Date(to) - new Date(from);

            // Convert duration from milliseconds to hours
            const durationHours = durationMs / (1000 * 60 * 60);

            // Update or initialize the category balance
            if (!balanceDict[category]) {
                balanceDict[category] = 0;
            }
            balanceDict[category] += durationHours;

            return balanceDict;
        }, {});

        res.status(200).json({
            status_code: 200,
            message: 'Leave balance retrieved successfully',
            data: categoryBalance
        });
    } catch (error) {
        console.error('Error retrieving leave balance:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: error.message || 'Unknown error occurred'
        });
    }
});

module.exports = router;
