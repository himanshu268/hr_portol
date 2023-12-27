const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const assign = require("../../models/assigntask");

router.get('/others', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Find all assigns with the specified user_id and sort by the 'from' field in ascending order
        const assigns = await assign.find({ user_id: userId }).sort({ from: 1 });
        console.log(assigns);

        res.status(200).json({
            status_code: 200,
            message: 'assign history retrieved successfully',
            data: assigns
        });
    } catch (error) {
        console.error('Error retrieving assign history:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

module.exports = router;
