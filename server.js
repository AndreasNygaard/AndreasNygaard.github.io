// server.js
import express from "express";
import cors from "cors";
import formData from "form-data";
import Mailgun from "mailgun.js";

const app = express();
app.use(express.json());

// Allow only your GitHub Pages site
app.use(
  cors({
    origin: "https://andreasnygaard.github.io",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Setup Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY, // from Render env vars
});

// POST endpoint for contact form
app.post("/contact", async (req, res) => {
  const { fullname, email, message } = req.body;

  try {
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Website Contact <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: "Andreas@phys.au.dk",
      subject: `Contact Form: ${fullname}`,
      text: `Message from: ${email}\n\n${message}`,
      "h:Reply-To": email, // lets you reply directly
    });

    console.log("Mailgun response:", result);
    res.json({ success: true });
  } catch (error) {
    console.error("Mailgun error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
