const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail = async (userEmail, userName) => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
            .header { background-color: #4f46e5; padding: 25px 20px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
            .content { padding: 30px 40px; color: #333333; line-height: 1.6; font-size: 15px; }
            .content h2 { color: #1f2937; font-size: 18px; margin-top: 0; }
            .highlight-box { background-color: #f8fafc; padding: 15px 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #4f46e5; }
            .btn-container { margin: 30px 0; }
            .btn { background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block; transition: opacity 0.3s; }
            .btn:hover { opacity: 0.9; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Adhayay</h1>
            </div>
            <div class="content">
                <h2>Hi ${userName},</h2>
                <p>Thanks for signing up! We built Adhayay because we were tired of constantly scrolling through WhatsApp groups and begging seniors for previous year question papers right before exams.</p>
                
                <p>Now, everything is in one place. You can easily find papers organized by branch, semester, and subject so you can just focus on studying.</p>
                
                <div class="highlight-box">
                    <strong>A quick favor:</strong> This platform works best when students help each other out. If you have recent quizzes, mid-sems, or end-sems that aren't on the site yet, please consider uploading them. It makes a huge difference!
                </div>

                <div class="btn-container">
                    <a href="https://your-adhayay-website.com/dashboard" class="btn">Go to Dashboard</a>
                </div>

                <p>If you spot any bugs or have ideas to make the site better, just reply directly to this email. We'd love to hear from you.</p>
                
                <p>Good luck with your exams!<br><br>Best,<br><strong>The Adhayay Team</strong></p>
            </div>
            <div class="footer">
                <p>Built by students, for students.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
        from: `"Adhayay Team" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Welcome to Adhayay! (No more hunting for PYQs)',
        html: htmlTemplate,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent successfully to ${userEmail} [Message ID: ${info.messageId}]`);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
};

module.exports = { sendWelcomeEmail };