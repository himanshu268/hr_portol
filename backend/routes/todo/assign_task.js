const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const assign = require("../../models/assigntask");
const checklogin = require('../../middleware/checklogin');

// Validation middleware
const validateAssignTaskInput = [
    body('taskname').notEmpty().trim(),
    body('priority').isIn(['High', 'Medium', 'Low']),
    // Add more validation rules for other fields
];

router.post('/task/assigntask', checklogin, validateAssignTaskInput, async (req, res) => {
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

        // Check user admin status
        if (req.user.admin !== 'yes') {
            return res.status(403).json({
                status_code: 403,
                message: 'You are not allowed to assign tasks',
                data: '',
            });
        }

        // Create task assignment
        const assignForm = await assign.create({
            username: req.user.username,
            user_id: req.user.user.id,
            taskname: req.body.taskname,
            priority: req.body.priority,
            startdate: req.body.startdate,
            deadline: req.body.deadline,
            assignby: req.body.assignby,
            assignto: req.body.assignto,
            description: req.body.description,
            status: req.body.status,
        });

        console.log(assignForm);

        res.status(200).json({
            status_code: 200,
            message: 'Task assigned successfully',
            data: assignForm,
        });
    } catch (error) {
        console.error('Error assigning task:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: '',
        });
    }
});

module.exports = router;
