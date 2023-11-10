const sendEmail = require("./sendEmail");

/**
 * Sends a verification email to the specified email address with a link to verify the email.
 * @param {Object} options - The options for sending the verification email.
 * @param {string} options.name - The name of the recipient.
 * @param {string} options.email - The email address of the recipient.
 * @param {string} options.verificationToken - The verification token to include in the verification link.
 * @param {string} options.origin - The origin URL of the application.
 * @returns {Promise} A promise that resolves when the email has been sent.
 */
const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  // Construct the verification link URL.
  const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;

  // Construct the email message.
  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  // Send the email using the sendEmail function.
  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
