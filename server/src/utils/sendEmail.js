const nodemailer = require("nodemailer");
const nodemailerConfig = require("../config/nodemailerConfig");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  return transporter.sendMail({
    from: "daniel.dominko@gmail.com", // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
