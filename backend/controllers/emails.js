const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("email body:", req.body);

    let config = {
      service: "gmail",
      auth: {
        user: process.env.GMAIL_APP_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let message = {
      from: process.env.GMAIL_APP_USER,
      to: req.body.email,
      subject: req.body.subject,
      html: req.body.html,
    };

    let info = await transporter.sendMail(message);

    console.log("email sent:", info.messageId);
    console.log("preview URL:", nodemailer.getTestMessageUrl(info));

    return res.status(201).json({
      msg: "Email sent",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error("error sending email to:", req.body.email, "error:", error);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
