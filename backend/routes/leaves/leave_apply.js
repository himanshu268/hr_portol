const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const leaves = require("../../models/leave");
const checklogin = require('../../middleware/checklogin');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/Document');
    },
    filename: function (req, file, cb) {
      req.body.profile_pic = Date.now() + path.extname(file.originalname);
      cb(null, req.body.profile_pic);
    }
  });
  
  const upload = multer({
    storage: storage
  });

router.post('/leave_apply/add', checklogin, upload.single('file'),async (req, res) => {
    try {
        const applyLeave = await leaves.create({
            username: req.user.username,
            user_id: req.user.user.id,
            category: req.body.category,
            sessions: req.body.sessions,
            from: req.body.from,
            to: req.body.to,
            applying_to: req.body.applying_to,
            cc: req.body.cc,
            emailid: req.body.emailid,
            phonenumber: req.body.phonenumber,
            reason: req.body.reason,
            file: 'Document/leave/' + req.file.file,
        });

        console.log(applyLeave);

        res.status(200).json({
            status_code: 200,
            message: 'Leave applied successfully',
            data: applyLeave
        });
    } catch (error) {
        console.error('Error applying leave:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});

module.exports = router;
