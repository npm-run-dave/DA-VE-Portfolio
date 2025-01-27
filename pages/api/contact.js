import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

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
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f7f6;
              }
              .email-container {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
              }
              h2 {
                color: #2d3748;
              }
              p {
                color: #4a5568;
              }
              .message {
                background-color: #e2e8f0;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                white-space: pre-wrap;
              }
              .footer {
                font-size: 12px;
                color: #a0aec0;
                text-align: center;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <h2>New Contact Form Message</h2>
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <div class="message">
                <p><strong>Message:</strong></p>
                <p>${message}</p>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent automatically from your website's contact form.</p>
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
