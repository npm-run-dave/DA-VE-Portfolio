import nodemailer from "nodemailer";
import validator from "validator";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

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

    const mailOptions = {
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
          <!-- Header with Logo to the left -->
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

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
