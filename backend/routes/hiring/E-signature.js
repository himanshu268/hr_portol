const express = require('express');
const router = express.Router();
const Documents = require('../../models/Documents');
const checklogin = require('../../middleware/checklogin');
const multer = require('multer');
const path = require("path");  // Add this line to include the 'path' module


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

// Route for uploading a Documents from a file
router.post('/E-signature/upload/save', checklogin, upload.single('signature'), async (req, res) => {
    try {
        if (req.user.admin !== 'yes') {
            return res.status(403).json({ message: 'Permission denied: You are not allowed to upload a Documents' });
        }

        // Assuming the file path is used for DocumentsImage
          const uploaded_doc = await Documents.create({
            username: req.user.username,
            userId: req.user.user.id,
            DocumentsImage: '/Document/E-signature/upload' + req.body.signature,
          });
          res.status(200).json({
          status_code: 200,
          message: 'uploaded successfully',
          data: uploaded_doc
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for uploading a signature from a file
router.post('/E-signature/draw/save', checklogin, upload.single('signature'), async (req, res) => {
    try {
        if (req.user.admin !== 'yes') {
            return res.status(403).json({ message: 'Permission denied: You are not allowed to upload a Documents' });
        }

        // Assuming the file path is used for DocumentsImage
          const uploaded_doc = await Documents.create({
            username: req.user.username,
            userId: req.user.user.id,
            DocumentsImage: '/Document/E-signature/draw' + req.body.signature,
          });
          res.status(200).json({
          status_code: 200,
          message: 'uploaded successfully',
          data: uploaded_doc
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route for saving a drawn signature
router.post('/E-signature/type/save', checklogin, upload.single('signature'), async (req, res) => {
    try {
        if (req.user.admin !== 'yes') {
            return res.status(403).json({ message: 'Permission denied: You are not allowed to upload a Documents' });
        }

        // Assuming the file path is used for DocumentsImage
          const uploaded_doc = await Documents.create({
            username: req.user.username,
            userId: req.user.user.id,
            DocumentsImage: '/Document/E-signature/type' + req.body.signature,
          });
          res.status(200).json({
          status_code: 200,
          message: 'uploaded successfully',
          data: uploaded_doc
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route for saving a signature type


module.exports = router;
