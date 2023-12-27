const express = require('express');
const router = express.Router();
const Training = require("../../models/training");
const checklogin = require('../../middleware/checklogin');

router.post('/training/add', checklogin, async (req, res) => {
    try {
        if (req.user.admin !== 'yes') {
            return res.status(403).json({
                status_code: 403,
                message: 'Permission denied: You are not allowed to add training data',
                data: ''
            });
        }

        const trainingForm = await Training.create({
            username: req.user.username,
            user_id: req.user.user.id,
            Trainer: req.user.Trainer,
            Training_title: req.user.Training_title,
            Trainee_Names: req.body.Trainee_Names,
            Comment: req.body.Comment,
            From_date: req.body.From_date,
            to_date: req.body.to_date,
        });

        console.log(trainingForm);

        res.status(200).json({
            status_code: 200,
            message: 'Training data uploaded successfully',
            data: trainingForm
        });
    } catch (error) {
        console.error('Error uploading training data:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

module.exports = router;
