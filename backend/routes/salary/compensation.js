const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const compensation = require("../../models/compensation");
const checklogin = require('../../middleware/checklogin');

// Validation middleware
const validateCompensationInput = [
    body('pay_rate').isNumeric(),
    // Add more validation rules for other fields
];

router.post('/compensation/add', checklogin, validateCompensationInput, async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status_code: 400,
                message: 'Validation error',
                errors: errors.array(),
            });
        }

        // Create compensation record
        const compensationForm = await compensation.create({
            username: req.user.username,
            user_id: req.user.user.id,
            emp_id: req.user.emp_id,
            emp_name: req.user.emp_name,
            pay_rate: req.body.pay_rate,
            pay_type: req.body.pay_type,
            effective_date: req.body.effective_date,
            overtime: req.body.overtime,
            change_reason: req.body.change_reason,
            comment: req.body.comment,
            pay_schedule: req.body.pay_schedule,
        });

        console.log(compensationForm);

        res.status(200).json({
            status_code: 200,
            message: 'Compensation record created successfully',
            data: compensationForm,
        });
    } catch (error) {
        console.error('Error creating compensation record:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: '',
        });
    }
});

module.exports = router;
