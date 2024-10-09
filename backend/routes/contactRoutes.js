const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Route to send email
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Setup Nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use SSL
    auth: {
      user: process.env.SMTP_USER, // SMTP email
      pass: process.env.SMTP_PASS, // SMTP email password
    },
  });

  // Define email options
  let mailOptions = {
    from: email,
    to: process.env.SMTP_USER,
    subject: subject,
    text: `You have a new message from:
    Name: ${name}
    Email: ${email}
    Message: ${message}`
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});

module.exports = router;
