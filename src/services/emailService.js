import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !to) {
    console.error("Email not sent: SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and recipient are required.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error.message);
    return false;
  }
};

export const sendAppointmentNotification = async (appointment) => {
  const html = `
    <h2>New Appointment Request</h2>
    <p><strong>Customer:</strong> ${appointment.customerName}</p>
    <p><strong>Phone:</strong> ${appointment.phone}</p>
    <p><strong>Email:</strong> ${appointment.email || "N/A"}</p>
    <p><strong>Service:</strong> ${appointment.service}</p>
    <p><strong>Preferred Date:</strong> ${new Date(appointment.preferredDate).toLocaleDateString()}</p>
    <p><strong>Preferred Time:</strong> ${appointment.preferredTime}</p>
    <p><strong>Message:</strong> ${appointment.message || "N/A"}</p>
  `;

  await sendEmail({ to: process.env.ADMIN_EMAIL, subject: "New Appointment Request", html });
};

export const sendContactNotification = async (contact) => {
  const html = `
    <h2>New Contact Enquiry</h2>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Phone:</strong> ${contact.phone}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Message:</strong> ${contact.message}</p>
  `;

  await sendEmail({ to: process.env.ADMIN_EMAIL, subject: "New Contact Enquiry", html });
};
