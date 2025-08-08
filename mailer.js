const nodemailer = require("nodemailer");

const { storeOtp } = require("./db/redis");

const requestResetPassword = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: process.env.API_MAIL_SERVICE,
    auth: {
      user: process.env.API_MAIL_USER,
      pass: process.env.API_MAIL_PASSWORD,
    },
  });
  const mailOption = {
    from: process.env.API_MAIL_USER,
    to: email,
    subject: "Your OTP code for password reset",
    text: `You are receiving this message because you (or someone else) have requested the reset of the password for your account.\n
      Please copy the following code, ${otp} and paste this to complete the process.\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  await storeOtp(email, otp);
  await transporter.sendMail(mailOption);
};

module.exports = {
  requestResetPassword: requestResetPassword,
};
