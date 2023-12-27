const express = require('express');
const router = express.Router();
const request = require('../../models/requesttimeoff');
const checklogin = require('../../middleware/checklogin');

router.post('/requesttimeoff', checklogin, async (req, res) => {
  try {
    const { category, from, to, amount, reason } = req.body;

    const requestOff = await request.create({
      username: req.user.username,
      user_id: req.user.user.id,
      category,
      from,
      to,
      amount,
      reason,
    });

    res.status(200).json({
      status_code: 200,
      message: 'Request timeoff applied successfully',
      data: requestOff,
    });
  } catch (error) {
    console.error('Error applying for time off:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
