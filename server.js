// server.js
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());

// Allow GitHub Pages and localhost for testing
/*app.use(
  cors({
    origin: ["https://andreasnygaard.github.io", "http://localhost:5500"],
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);*/
app.use(cors());

// POST endpoint for contact form
app.post("/contact", async (req, res) => {
  const { fullname, email, message } = req.body;

  try {
    const payload = {
      api_key: process.env.SMTP2GO_API_KEY,   // Your HTTP API key from SMTP2GO
      to: ["Andreas@phys.au.dk"],             // Recipient
      sender: process.env.SMTP2GO_SENDER,    // Verified sender email (your email)
      subject: `Contact Form: ${fullname}`,
      text_body: `Message from: ${email}\n\n${message}`,
      reply_to: email,                        // Visitor’s email
    };
    // Safe logging
    console.log("Payload to SMTP2GO:", {
      ...payload,
      api_key: "***hidden***"
    });

    const response = await axios.post(
      "https://api.smtp2go.com/v3/email/send",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.data.success_count > 0) {
      res.json({ success: true });
    } else {
      console.error("SMTP2GO API response:", response.data);
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  } catch (error) {
    console.error("SMTP2GO API error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
