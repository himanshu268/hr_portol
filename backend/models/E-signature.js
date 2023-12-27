const mongoose = require('mongoose');
const {Schema}=mongoose;

const signatureSchema = new Schema({
    username: { type: String, required: true },
    userId: { type: String, required: true }, // Assuming you have a user authentication system
    signatureImage: { type: String, required: true }, // Path to the signature image file
    created_at: { type: Date, default: Date.now },
  });

  module.exports=mongoose.model('E-signature', signatureSchema);