const transporter = require('../config/mailer');

const sendWelcomeEmail = async (name, email) => {
    try {
        await transporter.sendMail({
            from: ' "Travel Planner" <${process.env.EMAIL_USER}>',
            to: email,
            subject: 'Welcome to Travel Planner!✈️',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
            <h2> Hello, ${name}! 👋</h2>
            <p>Your account was created successfully in <strong>Travel Planner</strong>.</p>
            <p>You can now start planning your trips and organizing your activities.</p>
            <br/>
            <p>Happy travels! 🌍</p>
            </div>
        `,
        });
        console.log('Welcome email sent to:', email);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

module.exports = {
    sendWelcomeEmail,
};