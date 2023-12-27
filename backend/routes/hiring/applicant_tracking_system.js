const express = require('express');
const router = express.Router();
const addEmployeeModel = require('../../models/add_employee');
const checklogin = require('../../middleware/checklogin');

const handleErrors = (res, statusCode, message, data = '') => {
  console.error(message);
  res.status(statusCode).json({ status_code: statusCode, message, data });
};

router.post('/applicant_tracking_system/add_employee', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to add an employee');
    }

    const addEmployeeForm = await addEmployeeModel.create({
      username: req.user.username,
      user_id: req.user.user.id,
      ...req.body,
    });

    console.log(addEmployeeForm);

    res.status(200).json({
      status_code: 200,
      message: 'Employee data created successfully',
      data: addEmployeeForm,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error adding employee data', error.message);
  }
});

router.get('/applicant_tracking_system/employee_list', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to retrieve the employee list');
    }

    const addEmployees = await addEmployeeModel.find().sort({ created_on: -1 });

    res.status(200).json({
      status_code: 200,
      message: 'Employee list retrieved successfully',
      data: addEmployees,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error retrieving employee list', error.message);
  }
});

router.get('/applicant_tracking_system/employee_list/employee_data/:id', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to retrieve specific employee data');
    }

    const empId = req.params.id;
    const employeeData = await addEmployeeModel.findById(empId);

    if (!employeeData) {
      return handleErrors(res, 404, 'Employee data not found');
    }

    res.status(200).json({
      status_code: 200,
      message: 'Employee data retrieved successfully',
      data: employeeData,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error retrieving employee data', error.message);
  }
});

router.put('/applicant_tracking_system/employee_list/employee_data/update/:id', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to update employee data');
    }

    const empId = req.params.id;
    const update = { ...req.body };
    const updatedEmployeeData = await addEmployeeModel.findByIdAndUpdate(empId, { $set: update }, { new: true });

    if (!updatedEmployeeData) {
      return handleErrors(res, 404, 'Employee data not found for update');
    }

    res.status(200).json({
      status_code: 200,
      message: 'Employee data updated successfully',
      data: updatedEmployeeData,
    });
  } catch (error) {
    handleErrors(res, 500, 'Error updating employee data', error.message);
  }
});

router.delete('/applicant_tracking_system/employee_list/employee_data/delete/:id', checklogin, async (req, res) => {
  try {
    if (req.user.admin !== 'yes') {
      return handleErrors(res, 403, 'Permission denied: You are not allowed to delete employee data');
    }

    const empId = req.params.id;
    const deleteResult = await addEmployeeModel.deleteMany({ _id: empId });

    if (deleteResult.deletedCount > 0) {
      res.status(200).json({
        status_code: 200,
        message: 'Employee data deleted successfully',
        data: deleteResult,
      });
    } else {
      return handleErrors(res, 404, 'No matching employee data found for deletion');
    }
  } catch (error) {
    handleErrors(res, 500, 'Error deleting employee data', error.message);
  }
});

module.exports = router;
