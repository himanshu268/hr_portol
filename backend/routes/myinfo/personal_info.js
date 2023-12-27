const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const User = require('../../models/user');
const checklogin = require('../../middleware/checklogin');

// Error handling middleware
const handleErrors = (err, res) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.admin === 'yes') {
    next();
  } else {
    res.status(403).json({ error: 'Permission denied' });
  }
};

router.post('/myinfo/personalinfo/save', checklogin, async (req, res) => {
  const {
    Designation,
    DOJ,
    DOB,
    gender,
    region,
    martial_Status,
    medicalhistory,
    bloodgroup,
    contactno,
    Emergencycontactno,
    hno,
    area,
    state,
    zipcode
    } = req.body;

  try {
    const newNote = {
      Designation,
      DOJ,
      DOB,
      gender,
      region,
      martial_Status,
      medicalhistory,
      bloodgroup,
      contactno,
      Emergencycontactno,
      hno,
      area,
      state,
      zipcode,
      priority: "hr" 
     };

    console.log(req.user.username);
    const note = await User.findByIdAndUpdate(req.user.user.id, { $set: newNote }, { new: true });

    if (!note) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ data: note, message: 'Personal information updated successfully' });
  } catch (error) {
    handleErrors(error, res);
  }
});

router.post('/upload/save', checklogin, isAdmin, async (req, res) => {
  try {
    const { filename } = req.file;

    // Save the file information in a secure way (e.g., store file details, not the actual file content in the database)
    // Use appropriate storage solutions like AWS S3 or Firebase Storage for file uploads in production

    res.json({ message: 'File uploaded successfully', filename });
  } catch (error) {
    handleErrors(error, res);
  }
});

router.post('/draw/save', checklogin, isAdmin, async (req, res) => {
  try {
    const { signatureData } = req.body;

    // Save the drawn signature data in a secure way (e.g., validate and sanitize input, store in the database)

    res.json({ message: 'Signature data saved successfully' });
  } catch (error) {
    handleErrors(error, res);
  }
});

router.post('/type/save', checklogin, isAdmin, async (req, res) => {
  try {
    const { signatureType } = req.body;

    // Save the signature type data in a secure way (e.g., validate and sanitize input, store in the database)

    res.json({ message: 'Signature type saved successfully' });
  } catch (error) {
    handleErrors(error, res);
  }
});

module.exports = router;
