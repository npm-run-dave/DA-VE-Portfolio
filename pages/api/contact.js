import nodemailer from "nodemailer";
import validator from "validator";
import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message, captcha } = req.body;

    const captchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    const captchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

    try {
      // ✅ FIX: Send as form-data (required for reCAPTCHA v2)
      const form = new FormData();
      form.append("secret", captchaSecretKey);
      form.append("response", captcha);

      const response = await axios.post(captchaVerificationUrl, form, {
        headers: form.getHeaders(),
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

      // ✅ Create transporter
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      // ✅ Send to recipient
      const recipientMailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: "📩 New Contact Form Submission",
        html: `
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: "Segoe UI", Tahoma, sans-serif;
              background: #f4f6f9;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #fff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            }
            .header {
              background: linear-gradient(90deg, #2b6cb0, #3182ce);
              color: #fff;
              padding: 20px 30px;
              font-size: 20px;
              font-weight: bold;
            }
            .content { padding: 30px; color: #333; }
            .content p { margin: 8px 0; font-size: 15px; }
            .content strong { color: #2b6cb0; }
            .message-box {
              margin-top: 20px;
              background: #f7fafc;
              padding: 15px;
              border-left: 4px solid #2b6cb0;
              border-radius: 8px;
              font-size: 14px;
              white-space: pre-wrap;
            }
            .footer {
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #888;
              background: #f9f9f9;
            }
            .footer a { color: #2b6cb0; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://img.icons8.com/color/48/000000/new-message.png" alt="logo"/> 
              New Contact Form Submission
            </div>
            <div class="content">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <div class="message-box">${sanitizedMessage}</div>
            </div>
            <div class="footer">
              <p>This email was generated automatically from your website’s contact form. <a href="#">Unsubscribe</a></p>
            </div>
          </div>
        </body>
        </html>
        `,
      };

      await transporter.sendMail(recipientMailOptions);

      // ✅ Send confirmation to user
      const userMailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "✅ Thanks for Contacting Us!",
        html: `
        <html>
        <head>
          <style>
            body { margin: 0; padding: 0; font-family: "Segoe UI", Tahoma, sans-serif; background: #f4f6f9; }
            .container {
              max-width: 600px; margin: 30px auto; background: #fff;
              border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            }
            .header {
              background: linear-gradient(90deg, #2b6cb0, #3182ce);
              color: #fff; padding: 20px 30px; font-size: 20px; font-weight: bold; text-align: center;
            }
            .content { padding: 30px; color: #333; }
            .message-box {
              margin: 20px 0; background: #edf2f7;
              padding: 15px; border-left: 4px solid #2b6cb0;
              border-radius: 8px; font-size: 14px; white-space: pre-wrap;
            }
            .footer {
              padding: 15px; text-align: center; font-size: 12px; color: #888; background: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Thank You for Contacting Us</div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>We’ve received your message and will reply shortly. Here’s a copy of what you sent:</p>
              <div class="message-box">${sanitizedMessage}</div>
              <p>Feel free to reply to this email if you’d like to add more details.</p>
            </div>
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
