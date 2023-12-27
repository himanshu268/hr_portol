// const express = require('express');
const axios = require('axios');
// const router = express.Router();
const express = require('express');
const router = express.Router();

// const app = express();

// app.use(express.json());

router.get('/api/upcoming-holidays/:loginDate', async (req, res) => {
    try {
      console.log("hello");
      const { loginDate } = req.params;
  
      // Get the current year dynamically
      const currentYear = new Date().getFullYear();
  
      // Use 'IN' as the country code for India
      const response = await axios.get(`https://date.nager.at/api/v2/PublicHolidays/${currentYear}/us`);
      const holidaysData = response.data;
  
      console.log('Raw holidays data:', holidaysData);
  
      // Check if the holidays data is an array or if it's nested within an object
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
  
      res.json(filteredHolidays);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;


