const express = require('express');
const router = express.Router();
const employee_data = require('../../models/add_employee');
const checklogin = require('../../middleware/checklogin');

const getDepartmentEmployees = async (req, res, department) => {
    try {
        const list = await employee_data.find({ Department: department }).sort({ Date: -1 });

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
};

// Dynamic route for department-specific employees
router.get('/:department', checklogin, async (req, res) => {
    const department = req.params.department;
    const allowedDepartments = ['IT', 'Education', 'Resourcing', 'Sports', 'GIS'];

    // Check if the requested department is valid
    if (!allowedDepartments.includes(department)) {
        return res.status(400).json({
            status_code: 400,
            message: 'Invalid department',
            data: '',
        });
    }

    // Call the function to retrieve department-specific employees
    await getDepartmentEmployees(req, res, `Axzora-${department}`);
});

module.exports = router;
