const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const user = require('../../models/user');

router.get("/team_axzora", checklogin, async (req, res) => {
    try {

        const status = await user.find()
        res.status(200).json({
            status_code: 200,
            message: "status updated sucessfully",
            data: status
        })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });

    }
})
module.exports = router;
