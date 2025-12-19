const nodemailer = require('nodemailer');

// Create email transporter (using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `http://localhost:3000/verify-email/${verificationToken}`;
  
  const mailOptions = {
    from: `"Food Sharing Platform" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Verify Your Email - Food Sharing Platform',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
          .header { text-align: center; color: #4CAF50; }
          .button { 
            display: inline-block; 
            padding: 15px 30px; 
            background: #4CAF50; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
          }
          .footer { color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="header">🍽️ Welcome to Food Sharing Platform!</h1>
          <p>Thank you for registering! Please verify your email address to start sharing food.</p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <p>Or copy this link into your browser:</p>
          <p style="background: #f4f4f4; padding: 10px; word-break: break-all;">${verificationUrl}</p>
          
          <p class="footer">
            If you didn't create an account, please ignore this email.
          </p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent to:', email);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Could not send verification email');
  }
};

module.exports = { sendVerificationEmail };
