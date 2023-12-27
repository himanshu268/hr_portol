const multer = require('multer');

// const uploadMiddleware = multer({
//     dest: './uploads/',
// });
var uploadMiddleware = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename:
 
function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ uploadMiddleware });

module.exports = upload;