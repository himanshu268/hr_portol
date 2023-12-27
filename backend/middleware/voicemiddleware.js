const multer = require('multer');

const voicemiddleware = multer({
  dest: '.voice/uploads/',
});
module.exports = voicemiddleware;