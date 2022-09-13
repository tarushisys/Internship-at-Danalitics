var mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

var student_reg= new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    rollno:{
        type: String,
        maxlength:10,
        trim: true,
        unique: true
    },
    college:{
        type: String,
        maxlength:32,
        trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
  },
  { timestamps: true }
);

student_reg
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

student_reg.methods = {
  autheticate: function(plainpassword) {

    return this.securePassword(plainpassword) === this.encry_password;

  },
  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("Student_Reg",student_reg);
