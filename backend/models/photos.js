const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  profile_pic: {
    type: String,
  },
});
module.exports=mongoose.model('Photo',PhotoSchema);