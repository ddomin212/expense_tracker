const sendEmail = require("./sendEmail");

/**
 * Sends a reset password email to the specified email address.
 * @param {Object} options - The options for the email.
 * @param {string} options.name - The name of the recipient.
 * @param {string} options.email - The email address of the recipient.
 * @param {string} options.token - The reset password token.
 * @param {string} options.origin - The origin of the request.
 * @returns {Promise} A promise that resolves when the email is sent.
 */
const sendResetPassswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  // Send the email using the sendEmail function from the sendEmail module.
  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};

module.exports = sendResetPassswordEmail;
