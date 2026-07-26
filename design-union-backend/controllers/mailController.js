// backend/controllers/mailController.js
const nodemailer = require("nodemailer");

const { MAIL_SERVICE, MAIL_USER, MAIL_PASS, MAIL_FROM } = process.env;

if (!MAIL_USER || !MAIL_PASS) {
  throw new Error("Mail credentials are not defined in environment variables");
}

// Step 1: Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

// Step 2: Define the sendMail function
const sendMail = async (sendTo, subject, text) => {
  if (!sendTo || !subject || !text) {
    throw new Error("sendMail: missing required parameters");
  }
  
  const mailOptions = {
    from: MAIL_FROM || MAIL_USER, // Sender address
    to: sendTo,
    subject: subject, // Subject line
    text, // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info; // Return the info for further use if needed
  } catch (error) {
    console.error("Error while sending email:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

module.exports = { sendMail };
