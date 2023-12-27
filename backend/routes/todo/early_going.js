const express = require('express');
const router = express.Router();
const timeoff = require('../../models/requesttimeoff');
const checklogin = require('../../middleware/checklogin');
const { check,validationResult } = require('express-validator');


// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.admin !== 'yes') {
        return res.status(403).json({
            status_code: 403,
            message: 'You are not allowed to check request timeoff',
            data: '',
        });
    }
    next();
};

// Validation middleware for requesttimeoff_id header
const validateRequestTimeoffId = [
    check('requesttimeoff_id').notEmpty().withMessage('requesttimeoff_id is required'),
];

// GET endpoint to retrieve pending timeoff requests
router.get('/early_going', checklogin, isAdmin, async (req, res) => {
    try {
        const list = await timeoff.find({ status: 'pending' }).sort({ Date: -1 });

        console.log(list);

        res.status(200).json({
            status_code: 200,
            message: 'Successfully listed requests',
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

// POST endpoint to approve or reject a timeoff request
router.post('/early_going/action', checklogin, isAdmin, validateRequestTimeoffId, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status_code: 400,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    const leave_id = req.header('requesttimeoff_id');
    const action = req.body.action;
    const comment = req.body.comment;

    try {
        let update = {};

        if (action === 'approve') {
            update = { status: 'Approve' };
        } else if (action === 'reject') {
            update = { status: 'reject', comment };
        }

        const leave = await timeoff.findByIdAndUpdate(leave_id, { $set: update }, { new: true });
        return res.json({ leave });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
