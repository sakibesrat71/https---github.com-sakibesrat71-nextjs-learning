const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const email1 = process.env.EMAIL1;
  const email2 = process.env.EMAIL2;
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    // Hash the OTP before saving
    const otpHash = await bcrypt.hash(otp, 10);

    // Save OTP to database for both email addresses
    await OTP.create({ email: email1, otpHash });
    await OTP.create({ email: email2, otpHash });

    // Setup Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    let mailOptions = {
      from: process.env.SMTP_USER,
      to: [email1, email2],
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
});

// Route to verify OTP and generate JWT
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const otpRecord = await OTP.findOne({ email });
      if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // Compare the received OTP with the hashed OTP
      const isValid = await otpRecord.compareOTP(otp);
      if (!isValid) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // OTP is valid, generate JWT
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
  
      // Delete the OTP from the database after verification
      await OTP.deleteOne({ email });
  
      res.status(200).json({ token });
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: 'Error verifying OTP', error });
    }
  });

module.exports = router;
