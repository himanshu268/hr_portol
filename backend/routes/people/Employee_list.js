const express = require('express');
const router = express.Router();
const employee_data = require('../../models/add_employee');
const checklogin = require('../../middleware/checklogin');

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.admin !== 'yes') {
        return res.status(403).json({
            status_code: 403,
            message: 'You are not allowed to check employee list',
            data: '',
        });
    }
    next();
};

// GET endpoint to retrieve the list of employees
router.get('/', checklogin, isAdmin, async (req, res) => {
    try {
        const list = await employee_data.find().sort({ Date: -1 });

        console.log(list);

        res.status(200).json({
            status_code: 200,
            message: 'Successfully listed employees',
            data: list,
        });
    } catch (error) {
        console.error('Error while checking the data:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: '',
        });
    }
});

module.exports = router;
