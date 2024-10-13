const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Route to send email
router.post('/mail', async (req, res) => {
  const { name, email, subject, message, honey } = req.body;

  // Honeypot check: If 'honey' field is filled, it's likely a bot
  if (honey) {
    return res.status(400).json({ message: 'Bot detected, email not sent' });
  }

  // Check for missing fields
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
    to: process.env.MYSELF,
    subject: subject,
    text: `You have a new message from:
    Name: ${name}
    Email: ${email}
    Message: ${message}`
  };

  let replymailOptions = {
    from: process.env.MYSELF,
    to: email,
    subject: "Thank you for contacting me",
    text: `Your message of interest:
    Name: ${name}
    Email: ${email}
    Message: ${message}
    has been sent to me successfully. I will get back to you as soon as possible with my personal mail.`
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(replymailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});


module.exports = router;
