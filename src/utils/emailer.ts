const email_transporter = require('../config/email_transporter');

const sendEmail = async (emails: String[], key: any, onSendCallback: Function) => {
    try {
        const emailHtml = generateEmailHtml(key);

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: emails,
            subject: 'Verification key',
            html: emailHtml
        };

        const res = await email_transporter.sendMail(mailOptions);

        onSendCallback(res);
    } catch (error) {
        throw error;
    }
}

const generateEmailHtml = (key: any) =>{
    return `
        <html>     
            <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333;
                    padding: 20px;
                    margin: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #4264c2;
                    text-align: center;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;

                }
                .key-box {
                    font-size: 20px;
                    font-weight: bold;
                    color: #ffffff;
                    background: #4264c2;
                    padding: 15px;
                    text-align: center;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .cta-button {
                    display: inline-block;
                    background-color: #4264c2;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    text-align: center;
                    margin-top: 20px;
                }
                .cta-button:hover {
                    background-color: #4264c2;
                }
                .footer {
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                    margin-top: 30px;
                }
            </style>
            </head> 

            <body>
                <div class="container">
                <h1>Verification key</h1>
                <p>Hello, </p>
                <p>Please use the verification key below to confirm your email address.</p>
                <div class="key-box">${key}</div>
                <p>If you didn't request this, please ignore this email.</p>
                <div class="footer"><p>&copy; ${new Date().getFullYear()} Joel Dejene. All rights reserved.</p></div>
                </div>
            </body>
        </html>                
    `;
}

module.exports = sendEmail;