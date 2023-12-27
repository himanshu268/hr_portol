const mongoose = require('mongoose');
const {Schema}=mongoose;

const DocumentsSchema = new Schema({
    username: { type: String, required: true }, // Assuming you have a user authentication system
    userId: { type: String, required: true }, // Assuming you have a user authentication system
    DocumentsImage: { type: String, required: true }, // Path to the Documents image file
    created_at: { type: Date, default: Date.now },
  });

  module.exports=mongoose.model('Documents', DocumentsSchema);