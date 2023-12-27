const express = require('express');
const router = express.Router();
const axios = require('axios');
const checklogin = require('../../middleware/checklogin');
const Leave = require('../../models/leave');

router.get('/combined-data/:loginDate', checklogin, async (req, res) => {
  try {
    const userId = req.user.user.id;

    // Retrieve leave history
    const leaves = await Leave.find({ user_id: userId }).sort({ from: 1 });

    // Fetch upcoming holidays
    const { loginDate } = req.params;
    const currentYear = new Date().getFullYear();
    const holidaysResponse = await axios.get(`https://date.nager.at/api/v2/PublicHolidays/${currentYear}/us`);
    const holidaysData = holidaysResponse.data;
    const holidays = Array.isArray(holidaysData) ? holidaysData : holidaysData.holidays || [];

    // Filter holidays that are within a certain range (e.g., 30 days) from the login date
    const proximityThreshold = 30;
    const filteredHolidays = holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      const loginDateTime = new Date(loginDate);
      const timeDiff = Math.abs(holidayDate.getTime() - loginDateTime.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff <= proximityThreshold;
    });

    res.status(200).json({
      status_code: 200,
      message: 'Data retrieved successfully',
      data: {
        leaves,
        upcomingHolidays: filteredHolidays,
      },
    });
  } catch (error) {
    console.error('Error retrieving combined data:', error);
    res.status(500).json({
      status_code: 500,
      message: 'Internal server error',
      data: '',
    });
  }
});

module.exports = router;
