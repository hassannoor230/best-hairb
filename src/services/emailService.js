import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log("Email not configured. Skipping email send.");
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send error:", error.message);
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
