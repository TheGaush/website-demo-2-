import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Configure your email transport
      // Using the credentials provided by the user
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "gj7587782@gmail.com",
          pass: process.env.EMAIL_PASS || "cokw ivqy iwzv smiz",
        },
      });

      console.log("Attempting to send email to gj7587782@gmail.com...");

      const mailOptions = {
        from: process.env.EMAIL_USER || "gj7587782@gmail.com",
        to: "gj7587782@gmail.com",
        subject: `New Message from ${name} via Demo Website`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      res.status(200).json({ success: "Message sent successfully!" });
    } catch (error) {
      console.error("Detailed Email Error:", error);
      res.status(500).json({ 
        error: "Failed to send email.", 
        details: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
