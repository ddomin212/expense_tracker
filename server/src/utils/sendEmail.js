const nodemailer = require("nodemailer");
const nodemailerConfig = require("../config/nodemailerConfig");
const nodemailerSendgrid = require("nodemailer-sendgrid");

/**
 * Sends an email using nodemailer and nodemailer-sendgrid
 * @param {Object} options - Object containing email details (to, subject, html)
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendEmail = async ({ to, subject, html }) => {
  // create transporter using nodemailer-sendgrid
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  // send email using transporter
  return transporter.sendMail({
    from: "daniel.dominko@gmail.com", // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
