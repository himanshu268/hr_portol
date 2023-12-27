const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    status: {
      type: String,
      default:"unavailable"
    },
    priority:{
      type: String,
      default:"emp"
    },
    Designation: {
      type: String,
      default:"none",
    },
    DOJ: {
      type: String,
      default:"none",
    },
    region: {
      type: String,
      default:"none",
    },
    DOB: {
      type: String,
      default:"none",
    },
    gender: {
      type: String,
      default:"none",
    },
    martial_Status: {
      type: String,
      default:"none",
    },
    medicalhistory: {
      type: String,
      default:"none",
    },
    bloodgroup: {
      type: String,
      default:"none",
    },
    contactno: {
      type: String,
      default:"none",
    },
    Emergencycontactno: {
      type: String,
      default:"none",
    },
    hno: {
      type: String,
      default:"none",
    },
    area: {
      type: String,
      default:"none",
    },
    state: {
      type: String,
      default:"none",
    },
    otp:{
        type:Number,
        default:"89548"

    },
    verified:{
        type:String,
        default:'false'
        
    },
    zipcode: {
      type: String,
      default:"none",
    },
    // profile_pic: {
    //   type: String,
    // },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
