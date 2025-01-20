import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email, verificationCode, name) {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use another email service like Outlook, Yahoo, etc.
    auth: {
      user: process.env.FROM_EMAIL, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  // Email configuration
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${verificationCode}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; color: #ffffff; padding: 20px; border-radius: 10px;">
    <h2 style="text-align: center; font-size: 24px; color: #00ff99;">Welcome to ATX Army ${name}!</h2>
    <p style="text-align: center; font-size: 18px;">Gear up, ${name}! Your verification code is:</p>
    <h1 style="background-color: #00ff99; color: #121212; padding: 15px; text-align: center; font-size: 36px; border-radius: 5px;">
        ${verificationCode}
    </h1>
    <p style="text-align: center; font-size: 16px;"><strong>verify your code in free fire with ATX-DEVIKA</strong>.</p>
</div>

    `
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}