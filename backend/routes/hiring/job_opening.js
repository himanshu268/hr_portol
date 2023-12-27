const express = require('express');
const router = express.Router();
const JobOpening = require('../../models/job_opening');
const checklogin = require('../../middleware/checklogin');

const handleErrors = (res, statusCode, message, data = '') => {
  console.error(message);
  res.status(statusCode).json({ status_code: statusCode, message, data });
};

router.post('/', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to create a job opening');
    }

    const jobOpeningForm = await JobOpening.create({
      username: req.user.username,
      user_id: req.user.user.id,
      ...req.body,
    });

    console.log(jobOpeningForm);

    res.status(200).json({
      status_code: 200,
      message: 'Job opening created successfully',
      data: jobOpeningForm,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error creating job opening', error.message);
  }
});

router.get('/job_opening_list', checklogin, async (req, res) => {
  try {
    const jobOpenings = await JobOpening.find().sort({ created_on: -1 });

    res.status(200).json({
      status_code: 200,
      message: 'Job openings retrieved successfully',
      data: jobOpenings,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error retrieving job openings', error.message);
  }
});

router.get('/job_opening_list/details', checklogin, async (req, res) => {
  try {
    const jobId  = req.header('jobId');
    const jobOpeningDetails = await JobOpening.findById(jobId);

    if (!jobOpeningDetails) {
      return handleErrors(res, 404, 'Job opening details not found');
    }

    res.status(200).json({
      status_code: 200,
      message: 'Job opening details retrieved successfully',
      data: jobOpeningDetails,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error retrieving job opening details', error.message);
  }
});

router.put('/job_opening_list/details/update', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to update job opening details');
    }
    const jobId  = req.header('jobId');
    const update = { ...req.body };
    const jobOpeningDataUpdated = await JobOpening.findByIdAndUpdate(jobId, { $set: update }, { new: true });

    if (!jobOpeningDataUpdated) {
      return handleErrors(res, 404, 'Job opening details not found for update');
    }

    res.status(200).json({
      status_code: 200,
      message: 'Job opening details updated successfully',
      data: jobOpeningDataUpdated,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error updating job opening details', error.message);
  }
});

router.delete('/job_opening_list/details/delete', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to delete job opening details');
    }
    const jobId  = req.header('jobId');
    const deleteResult = await JobOpening.deleteMany({ _id: jobId });

    if (deleteResult.deletedCount > 0) {
      res.status(200).json({
        status_code: 200,
        message: 'Job opening details deleted successfully',
        data: deleteResult,
      });
    } else {
      return handleErrors(res, 404, 'No matching job opening details found for deletion');
    }
  } catch (error) {
    handleErrors(res, 500, 'Error deleting job opening details', error.message);
  }
});

module.exports = router;
