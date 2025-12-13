import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { consultantId, consultantEmail } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email consultant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: consultantEmail,
      subject: "New Hire Request",
      text: `You have been hired! Consultant ID: ${consultantId}`,
    });

    // Notify admins
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "Consultant Hire Notification",
      text: `Consultant ${consultantId} has been hired.`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to process hire request" });
  }
}
