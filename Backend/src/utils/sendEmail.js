const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    let mailDetails = {
      from: process.env.AUTH_USER,
      to,
      subject,
      text,
    };

    await mailTransporter.sendMail(mailDetails);

   
    return true;
  } catch (err) {
   
    return false;
  }
};

module.exports = sendEmail;
