const express = require('express');
const router = express.Router();
const WhatsOnMind = require("../../models/whats_on_mind");
const ExperienceLetter = require("../../models/experience_letter");
const ResignationLetter = require("../../models/resignation");
const askquestion = require("../../models/askquestion");

const checklogin = require('../../middleware/checklogin');

const handleErrorResponse = (res, statusCode, message, error) => {
    console.error(`Error: ${message}`, error);
    res.status(statusCode).json({
        status_code: statusCode,
        message: `Internal server error: ${message}`,
        data: ''
    });
};

router.post('/whats_on_your_mind', checklogin, async (req, res) => {
    try {
        const queryForm = await WhatsOnMind.create({
            username: req.user.username,
            user_id: req.user.user.id,
            query: req.body.query,
        });

        console.log(queryForm);

        res.status(200).json({
            status_code: 200,
            message: 'Survey uploaded successfully',
            data: queryForm
        });
    } catch (error) {
        handleErrorResponse(res, 500, 'Error uploading survey', error);
    }
});
router.post("/askquestion", checklogin, async (req, res) => {
    try {
        const queryForm = await askquestion.create({
            username: req.user.username,
            user_id: req.user.user.id,
            ask: req.body.askquestion,
        });

        console.log(queryForm);

        res.status(200).json({
            status_code: 200,
            message: 'question uploaded successfully',
            data: queryForm
        });
    } catch(error) {
        console.error(error.message);
        return res.status(500).send("internal server error");
    }
});


router.post('/experience_letter', checklogin, async (req, res) => {
    try {
        const experience = await ExperienceLetter.create({
            username: req.user.username,
            user_id: req.user.user.id,
            Name: req.body.Name,
            DOJ: req.body.DOJ,
            Department: req.body.Department,
            Designation: req.body.Designation,
            Descritpion: req.body.Descritpion,
        });

        console.log(experience);

        res.status(200).json({
            status_code: 200,
            message: 'Experience letter uploaded successfully',
            data: experience
        });
    } catch (error) {
        handleErrorResponse(res, 500, 'Error uploading experience letter', error);
    }
});

router.post('/resignation_letter', checklogin, async (req, res) => {
    try {
        const resignation = await ResignationLetter.create({
            username: req.user.username,
            user_id: req.user.user.id,
            Resignation_Date: req.body.Resignation_Date,
            last_workday: req.body.last_workday,
            send_to: req.body.send_to,
            Descritpion: req.body.Descritpion,
        });

        console.log(resignation);

        res.status(200).json({
            status_code: 200,
            message: 'Resignation letter uploaded successfully',
            data: resignation
        });
    } catch (error) {
        handleErrorResponse(res, 500, 'Error uploading resignation letter', error);
    }
});

module.exports = router;
