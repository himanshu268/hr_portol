const express = require('express');
const connecttomongo = require('./db');
const multer = require('multer');
var path = require('path');
const bodyParser = require('body-parser');

connecttomongo();

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '35mb' }));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  })
);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/user');
//   },
//   filename: function (req, file, cb) {
//     req.body.file = Date.now() + path.extname(file.originalname);
//     cb(null, req.body.file);
//   },
// });
// const upload = multer({
//   storage: storage,
// });

// Move express.json middleware to the top
app.use(express.json());

app.use('/photo', require('./routes/todo/photo'));

// Routes
app.use('/api', require('./routes/EV/auth'));

//home
app.use('/holidays', require('./routes/home/upcoming_holiday'));



//myinfo
app.use('/myinfo', require('./routes/myinfo/personal_info'));
app.use('/myinfo', require('./routes/myinfo/Documents'));
app.use('/myinfo', require('./routes/myinfo/leaves'));
app.use('/myinfo', require('./routes/myinfo/training'));





//leaves
app.use('/leave', require('./routes/leaves/leave_apply'));
app.use('/leave', require('./routes/leaves/history'));
app.use('/leave', require('./routes/leaves/leave_cancel'));
app.use('/leave', require('./routes/leaves/leave_balance'));
app.use('/leave', require('./routes/leaves/leave_calender'));
app.use('/leave', require('./routes/leaves/team_leave'));
app.use('/admin', require('./routes/HRV/auth'));



//todo
app.use('/todo', require('./routes/todo/survey_form'));
app.use('/todo', require('./routes/todo/assign_task'));
app.use('/todo', require('./routes/todo/task'));
app.use('/todo', require('./routes/todo/pending_leave_request'));
app.use('/todo', require('./routes/todo/early_going'));

//salary
app.use('/salary', require('./routes/salary/loan'));

//hiring
app.use("/hiring", require('./routes/hiring/job_opening'));
app.use("/hiring", require('./routes/hiring/applicant_tracking_system'));

//people
app.use('/people', require('./routes/people/Employee_list'));
app.use('/people', require('./routes/people/report'));











// app.use('/api', require('./routes/likes'));
app.use('/api', require('./routes/todo/photo'));
// app.use('/api', require('./routes/voice'));

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`);
});
