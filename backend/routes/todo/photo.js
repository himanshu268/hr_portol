const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");  // Add this line to include the 'path' module

const User = require('../../models/photos');
const { body, validationResult } = require('express-validator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/user');
  },
  filename: function (req, file, cb) {
    req.body.profile_pic = Date.now() + path.extname(file.originalname);
    cb(null, req.body.profile_pic);
  }
});

const upload = multer({
  storage: storage
});

router.post('/upload', upload.single("profile_pic"), async (req, res) => {
  try {
    // Create a new photo document.
    if (req.body.profile_pic && req.body.profile_pic !== '') {
      const applyLeave = await User.create({
        profile_pic: 'uploads/user/' + req.body.profile_pic,
      });

      // Send a response to the client.
      res.status(201).json({
        message: 'Photo uploaded successfully!',
      });
    } else {
      res.status(400).json({
        message: 'Bad Request: No photo provided.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

module.exports = router;
