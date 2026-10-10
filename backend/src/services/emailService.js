const path = require("path");
const nodemailer = require("nodemailer");

const DEFAULT_RECIPIENT = "shaikjafarsadhik2521@gmail.com";

let cachedTransporter = null;
let cachedCredentialsKey = null;

/**
 * Build or reuse an SMTP transporter based on environment configuration.
 */
function getTransporter() {
  // Always ensure freshest values from backend/.env
  try {
    require("dotenv").config({ path: path.join(__dirname, "../../.env") });
  } catch (_) {}

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "").trim();

  const credentialsKey = `${host}:${port}:${user}:${pass}`;

  if (cachedTransporter && cachedCredentialsKey === credentialsKey) {
    return cachedTransporter;
  }

  if (user && pass) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    cachedCredentialsKey = credentialsKey;
    return cachedTransporter;
  }

  return null;
}

/**
 * Format enquiry notification HTML email.
 */
function buildEnquiryEmailHtml({ name, email, phone, service, message, destinationName, packageName }) {
  const serviceTopic = service || destinationName || packageName || "General Inquiry";
  const formattedDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dubai",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f8; margin: 0; padding: 24px; color: #141f36; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 36, 84, 0.06); }
    .header { background: #0f2454; padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
    .header p { margin: 6px 0 0; color: #93c5fd; font-size: 13px; }
    .content { padding: 32px; }
    .badge { display: inline-block; padding: 5px 12px; background: #e6f6f9; color: #2095ae; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; border-radius: 20px; margin-bottom: 20px; }
    .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .field-table td { padding: 12px 14px; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .field-label { width: 35%; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
    .field-value { width: 65%; color: #0f2454; font-weight: 700; }
    .field-value a { color: #2095ae; text-decoration: none; }
    .message-box { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-top: 10px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .actions { margin-top: 28px; padding-top: 24px; border-top: 1px solid #edf2f7; display: flex; gap: 12px; }
    .btn { display: inline-block; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; text-align: center; }
    .btn-primary { background: #0f2454; color: #ffffff; }
    .btn-whatsapp { background: #25D366; color: #ffffff; }
    .footer { background: #f8fafc; padding: 18px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Customer Inquiry</h1>
      <p>Received on ${formattedDate} (Dubai Time)</p>
    </div>
    <div class="content">
      <span class="badge">Inquiry: ${serviceTopic}</span>

      <table class="field-table">
        <tr>
          <td class="field-label">Customer Name</td>
          <td class="field-value">${name}</td>
        </tr>
        <tr>
          <td class="field-label">Email Address</td>
          <td class="field-value"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td class="field-label">Phone / WhatsApp</td>
          <td class="field-value"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td class="field-label">Service Requested</td>
          <td class="field-value">${serviceTopic}</td>
        </tr>
      </table>

      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 6px;">Customer Message:</div>
      <div class="message-box">${message || "(No message provided)"}</div>

      <div style="margin-top: 24px;">
        <a href="mailto:${email}?subject=${encodeURIComponent("Re: Your Karnish Tourism Inquiry")}" class="btn btn-primary" style="color: #ffffff;">Reply via Email</a>
        &nbsp;
        <a href="https://wa.me/${String(phone).replace(/[^0-9]/g, "")}" class="btn btn-whatsapp" style="color: #ffffff;">Open in WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      Karnish Tourism LLC · Automated Booking &amp; Inquiry Dispatch System
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send an email notification when a user submits an inquiry form.
 *
 * @param {Object} inquiry
 * @param {string} inquiry.name
 * @param {string} inquiry.email
 * @param {string} inquiry.phone
 * @param {string} [inquiry.service]
 * @param {string} [inquiry.message]
 * @param {string} [inquiry.destinationName]
 * @param {string} [inquiry.packageName]
 * @returns {Promise<{ success: boolean, messageId?: string, simulated?: boolean }>}
 */
async function sendInquiryNotification(inquiry) {
  const recipient = process.env.INQUIRY_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || `"Karnish Tourism Desk" <noreply@karnishtourism.com>`;
  const subject = `[New Inquiry] ${inquiry.name} — ${inquiry.service || "Travel Inquiry"}`;

  const html = buildEnquiryEmailHtml(inquiry);
  const text = [
    `NEW CUSTOMER INQUIRY - KARNISH TOURISM`,
    `=====================================`,
    `Name:    ${inquiry.name}`,
    `Email:   ${inquiry.email}`,
    `Phone:   ${inquiry.phone}`,
    `Service: ${inquiry.service || "General Inquiry"}`,
    `Date:    ${new Date().toISOString()}`,
    ``,
    `Message:`,
    `${inquiry.message || "(No message provided)"}`,
    `=====================================`,
  ].join("\n");

  // 1. Brevo HTTP API (Uses Port 443 - Bypasses Render firewall which blocks SMTP ports 587/465)
  const brevoApiKey = (process.env.BREVO_API_KEY || "").trim();
  if (brevoApiKey) {
    try {
      const senderEmail = (process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || "info@karnishtourism.com").trim();
      const senderName = process.env.BREVO_SENDER_NAME || "Karnish Tourism";

      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: recipient }],
          replyTo: inquiry.email ? { email: inquiry.email, name: inquiry.name } : undefined,
          subject,
          htmlContent: html,
          textContent: text,
        }),
      });

      const brevoData = await brevoRes.json().catch(() => ({}));
      if (brevoRes.ok) {
        console.log(`[Brevo API] Inquiry email successfully dispatched to ${recipient} (ID: ${brevoData.messageId})`);
        return { success: true, messageId: brevoData.messageId, recipient, provider: "brevo" };
      } else {
        console.error(`[Brevo API Error]:`, brevoData);
      }
    } catch (err) {
      console.error(`[Brevo Fetch Error]:`, err.message);
    }
  }

  // 2. Standard Nodemailer SMTP (Local dev or unblocked servers)
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`\n======================================================`);
    console.log(`[SMTP Notification Simulated]`);
    console.log(`To:      ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(`Name:    ${inquiry.name} (${inquiry.email}, ${inquiry.phone})`);
    console.log(`Service: ${inquiry.service || "General Inquiry"}`);
    console.log(`Message: ${inquiry.message}`);
    console.log(`------------------------------------------------------`);
    console.log(`NOTE: To send live emails on cloud hosts like Render, configure in .env / Render:`);
    console.log(`BREVO_API_KEY=xkeysib-...`);
    console.log(`BREVO_SENDER_EMAIL=lexonitservices@gmail.com`);
    console.log(`INQUIRY_NOTIFICATION_EMAIL=shaikjafarsadhik2521@gmail.com`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true, recipient };
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      replyTo: inquiry.email,
      subject,
      text,
      html,
    });

    console.log(`[SMTP] Inquiry email successfully dispatched to ${recipient} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId, recipient };
  } catch (error) {
    console.error(`[SMTP Error] Failed to send email to ${recipient}:`, error.message);
    // Don't throw fatal error so inquiry creation succeeds even if SMTP provider rejects
    return { success: false, error: error.message, recipient };
  }
}

module.exports = {
  sendInquiryNotification,
  DEFAULT_RECIPIENT,
};
