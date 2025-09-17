// server.js
import express from "express";
import cors from "cors";
import { MailerSend } from 'mailersend';


const app = express();
app.use(express.json());

// Allow only your GitHub Pages site
/*app.use(
  cors({
    origin: "https://andreasnygaard.github.io",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);*/
app.use(cors());


const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});


// POST endpoint for contact form
app.post("/contact", async (req, res) => {
  const { fullname, email, message } = req.body;

  try {
    const response = await mailerSend.email.send({
      from: "andreas@phys.au.dk", // must be a verified sender in MailerSend
      to: "andreas@phys.au.dk",
      subject: `Contact Form: ${fullname}`,
      text: `Message from: ${email}\n\n${message}`,
      //reply_to: email,
    });

    console.log("MailerSend response:", response);
    res.json({ success: true });
  } catch (error) {
    console.error("MailerSend error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
