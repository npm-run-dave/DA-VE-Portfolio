import nodemailer from "nodemailer";
import validator from "validator";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message, captcha } = req.body;

    const captchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    const captchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

    try {
      const response = await axios.post(captchaVerificationUrl, null, {
        params: {
          secret: captchaSecretKey,
          response: captcha,
        },
      });

      if (!response.data.success) {
        return res
          .status(400)
          .json({ message: "reCAPTCHA verification failed" });
      }

      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      const sanitizedMessage = validator.escape(message);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const recipientMailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: "New Message from Contact Form",
        html: `
        <html>
        <head>
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f7fafc;
            }
            .email-container {
              background-color: #ffffff;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              max-width: 650px;
              margin: 40px auto;
            }
            h2 {
              color: #2b6cb0;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              color: #4a5568;
              font-size: 14px;
              line-height: 1.6;
            }
            .message {
              background-color: #edf2f7;
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
              font-size: 14px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              font-size: 12px;
              color: #a0aec0;
              text-align: center;
              margin-top: 30px;
            }
            .footer a {
              color: #2b6cb0;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            .header {
              display: flex;
              align-items: center;
              background-color: #2b6cb0;
              color: white;
              padding: 15px;
              font-size: 18px;
              border-radius: 12px 12px 0 0;
            }
            .logo {
              max-width: 50px;
              margin-right: 15px;
            }
            .content p strong {
              color: #2b6cb0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img class="logo" src="https://example.com/path/to/your-logo.png" alt="Your Company Logo">
              <span>You’ve Received a New Contact Form Message</span>
            </div>
            <div class="content">
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <div class="message">
                <p><strong>Message:</strong></p>
                <p>${sanitizedMessage}</p>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent automatically from your website's contact form. <a href="#">Unsubscribe</a> if you no longer wish to receive these emails.</p>
          </div>
        </body>
      </html>
        `,
      };

      await transporter.sendMail(recipientMailOptions);

      const userMailOptions = {
        from: process.env.GMAIL_USER,
        to: email, // User's email
        subject: "We've Received Your Message",
        html: `
        <html>
        <head>
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f7fafc;
            }
            .email-container {
              background-color: #ffffff;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              max-width: 650px;
              margin: 40px auto;
            }
            h2 {
              color: #2b6cb0;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              color: #4a5568;
              font-size: 14px;
              line-height: 1.6;
            }
            .footer {
              font-size: 12px;
              color: #a0aec0;
              text-align: center;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h2>Thank You for Contacting Us!</h2>
            <p>Hello ${name},</p>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of your message:</p>
            <div class="message">
              <p>${sanitizedMessage}</p>
            </div>
            <p>If you have any further questions, feel free to reply to this email.</p>
            <div class="footer">
              <p>This is an automated response. Please do not reply directly to this email.</p>
            </div>
          </div>
        </body>
      </html>
        `,
      };

      await transporter.sendMail(userMailOptions);

      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email or verifying CAPTCHA:", error);
      return res
        .status(500)
        .json({ message: "Failed to send email or verify CAPTCHA" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
