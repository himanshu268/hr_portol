const express = require('express');
const router = express.Router();
const employee_data = require('../../models/add_employee');
const checklogin = require('../../middleware/checklogin');
const asyncHandler = require('express-async-handler');


// Middleware to check if the user is an admin

// GET endpoint to retrieve the list of employees and log month and date
router.get('/report',checklogin, async (req, res) => {
    try {
        // Fetch the list of employees sorted by the "Date" property in descending order
        const list = await employee_data.find().sort({ Date: -1 });

        // Access the "Date" property for each item in the list
        const hiringDates = list.map(item => item.hiring_date);

        // Extract month and date from each hiring date
        const monthAndDateArray = hiringDates.map(date => {
            const hiringDate = new Date(date);
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Month is zero-based
            const currentDay = new Date().getDate();

            // Compare with the current month and date
            if (
                hiringDate.getMonth() + 1 > currentMonth ||
                (hiringDate.getMonth() + 1 === currentMonth && hiringDate.getDate() > currentDay)
            ) {
                // If month and date are greater, return with the current year
                return `${hiringDate.getMonth() + 1}-${hiringDate.getDate()}-${currentYear}`;
            } else {
                // If not, increase the current year by 1
                return `${hiringDate.getMonth() + 1}-${hiringDate.getDate()}-${currentYear + 1}`;
            }
        });

        // Add monthAndDateArray to the list under the heading "service"
        const updatedList = list.map((item, index) => ({
            ...item,
            service: monthAndDateArray[index],
        }));

        console.log(updatedList);

        res.status(200).json({
            status_code: 200,
            message: 'Successfully listed employees',
            data: updatedList,
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

router.get('/upcoming-birthdays',checklogin,asyncHandler(async (req, res) => {
        const currentDate = new Date();

        const list = await Employee.find({
            $expr: {
                $gte: [{ $month: '$birth_date' }, { $month: currentDate }],
                $or: [
                    { $gt: [{ $month: '$birth_date' }, { $month: currentDate }] },
                    {
                        $and: [
                            { $eq: [{ $month: '$birth_date' }, { $month: currentDate }] },
                            { $gte: [{ $dayOfMonth: '$birth_date' }, { $dayOfMonth: currentDate }] },
                        ],
                    },
                ],
            },
        }).sort({ birth_date: 1 });

        const plainList = list.map(item => item.toObject());

        res.status(200).json({
            status_code: 200,
            message: 'Successfully listed employees with upcoming birthdays',
            data: plainList,
        });
    })
);

router.get('/upcoming-work-anniversery',checklogin,asyncHandler(async (req, res) => {
    const currentDate = new Date();

    const list = await Employee.find({
        $expr: {
            $gte: [{ $month: '$hiring_date' }, { $month: currentDate }],
            $or: [
                { $gt: [{ $month: '$hiring_date' }, { $month: currentDate }] },
                {
                    $and: [
                        { $eq: [{ $month: '$hiring_date' }, { $month: currentDate }] },
                        { $gte: [{ $dayOfMonth: '$hiring_date' }, { $dayOfMonth: currentDate }] },
                    ],
                },
            ],
        },
    }).sort({ hiring_date: 1 });

    const plainList = list.map(item => item.toObject());

    res.status(200).json({
        status_code: 200,
        message: 'Successfully listed employees with upcoming birthdays',
        data: plainList,
    });
})
);



module.exports = router;
