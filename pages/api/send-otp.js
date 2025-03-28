import sgMail from "@sendgrid/mail";

// Set SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await sgMail.send({
      to: email,
      from: "hire.guruu@gmail.com", // Must match verified SendGrid sender
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    // In a real app, store the OTP in a database (e.g., Firebase Firestore)
    res.status(200).json({ success: true, otp: otp });
  } catch (error) {
    console.error("Full SendGrid error:", {
      message: error.message,
      code: error.code,
      responseHeaders: error.response?.headers,
      responseBody: error.response?.body,
    });
  }
}
