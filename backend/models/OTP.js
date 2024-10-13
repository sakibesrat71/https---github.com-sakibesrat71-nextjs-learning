const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // OTP expires in 10 minutes
  },
});

OTPSchema.methods.compareOTP = async function(otp) {
  return await bcrypt.compare(otp, this.otpHash);
};

module.exports = mongoose.model('OTP', OTPSchema);
