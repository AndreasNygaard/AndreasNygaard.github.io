// server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
// Allow only my GitHub Pages site to access
app.use(cors({
  origin: "https://andreasnygaard.github.io",
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// POST endpoint for contact form
app.post("/contact", async (req, res) => {
  const { fullname, email, message } = req.body;

  try {
    // Configure mail transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "outlook", "yahoo"
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: email,
      to: "Andreas@phys.au.dk",
      subject: `Contact Form: ${fullname}`,
      text: message,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
