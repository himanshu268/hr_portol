const express = require('express');
const router = express.Router();
const loan = require("../../models/loan");
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

router.post('/loan/apply_loan',
    upload.fields([
        { name: 'aadhar_card', maxCount: 1 },
        { name: 'pan_card', maxCount: 1 },
        { name: 'photo', maxCount: 1 },
        { name: 'bank_statement', maxCount: 1 },
        { name: 'salary_slip', maxCount: 1 },

        // Add other fields as needed
    ]), checklogin, async (req, res) => {
        console.log(req.user.admin)


        try {
            const loanform = await loan.create({

                username: req.user.username,
                user_id: req.user.user.id,
                Desired_Amount: req.body.Desired_Amount,
                Annual_income: req.body.Annual_income,
                Loan_used: req.body.Loan_used,
                First: req.body.First,
                Last: req.body.Last,
                Birth_Date: req.body.Birth_Date,
                Martial_status: req.body.Martial_status,
                Phone_Number: req.body.Phone_Number,
                emailid: req.body.emailid,
                street_Address1: req.body.street_Address1,
                street_Address2: req.body.street_Address2 || '', // Assuming this field is optional
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                address_year: req.body.address_year,
                type_of_employement: req.body.type_of_employement,
                Comapny_Name: req.body.Comapny_Name,
                occupation: req.body.occupation,
                gross_income: req.body.gross_income,
                monthly_rent: req.body.monthly_rent,
                Down_payement: req.body.Down_payement,
                Comments: req.body.Comments,
                Bank_Name: req.body.Bank_Name,
                Account_number: req.body.Account_number,
                IFSC_Code: req.body.IFSC_Code,
                Address: req.body.Address,
                pan_card: 'Document/loan/' + req.files.pan_card[0].filename,
                aadhar_card: 'Document/loan/' + req.files.aadhar_card[0].filename,
                photo: 'Document/loan/' + req.files.photo[0].filename,
                bank_statement: 'Document/loan/' + req.files.bank_statement[0].filename,
                salary_slip: 'Document/loan/' + req.files.salary_slip[0].filename,
            });
            console.log(loanform);
            res.status(200).json({
                status_code: 200,
                message: 'Survey uploaded successfully',
                data: loanform
            });
        } catch (error) {
            console.error('Error uploading survey:', error);
            res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });

        }

    });

router.get('/loan/my_loan', checklogin, async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Find all leaves with the specified user_id and sort by the 'from' field in ascending order
        const loans = await loan.find({ user_id: userId }).sort({ from: 1 });

        res.status(200).json({
            status_code: 200,
            message: 'my loan data retrieve successfully',
            data: loans
        });
    } catch (error) {
        console.error('Error retrieving loan history:', error);
        res.status(500).json({
            status_code: 500,
            message: 'Internal server error',
            data: ''
        });
    }
});
module.exports = router