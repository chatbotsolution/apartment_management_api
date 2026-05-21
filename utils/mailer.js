const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendResetEmail = async (to, resetLink) => {
    await transporter.sendMail({
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Reset Your Password",
        html: `
            <h3>Password Reset Request</h3>
            <p>Click below to reset your password:</p>
            <a href="${resetLink}" target="_blank">${resetLink}</a>
            <p>This link will expire in 15 minutes.</p>
        `,
    });
};

module.exports = { sendResetEmail };