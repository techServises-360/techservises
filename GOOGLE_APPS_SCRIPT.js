/**
 * TechServices — Contact Form Email Handler
 *
 * SETUP:
 * 1. Go to https://script.google.com/
 * 2. Create a new project → paste this code
 * 3. Project Settings → Script properties:
 *    - WEBHOOK_SECRET = (create a random string like: ts_2024_secure_key_xyz)
 *    - ADMIN_EMAIL = your@email.com (where contact forms go)
 *    - FROM_NAME = TechServices
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. Add to .env.local:
 *    GOOGLE_APPS_SCRIPT_URL=your_web_app_url
 *    GOOGLE_APPS_SCRIPT_SECRET=same_as_WEBHOOK_SECRET_above
 */

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const expectedSecret = props.getProperty("WEBHOOK_SECRET") || "";
    const adminEmail = props.getProperty("ADMIN_EMAIL");
    const fromName = props.getProperty("FROM_NAME") || "TechServices";

    // Parse request
    const body = JSON.parse(e.postData.contents);
    
    // Verify secret
    if (expectedSecret && body.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }

    // Validate required fields
    if (!adminEmail) {
      return jsonResponse({ ok: false, error: "Admin email not configured" }, 500);
    }
    if (!body.name || !body.email || !body.service) {
      return jsonResponse({ ok: false, error: "Missing required fields" }, 400);
    }

    const { name, email, service, serviceLabel, message } = body;

    // Send email to admin
    const subject = `New Contact: ${serviceLabel || service} - ${name}`;
    const htmlBody = buildContactEmail(name, email, service, serviceLabel, message, fromName);

    MailApp.sendEmail({
      to: adminEmail,
      replyTo: email,
      subject: subject,
      htmlBody: htmlBody,
      name: fromName + " Contact Form",
    });

    // Send confirmation to customer
    const confirmSubject = "We received your message — " + fromName;
    const confirmHtml = buildConfirmationEmail(name, serviceLabel || service, fromName);
    
    MailApp.sendEmail({
      to: email,
      subject: confirmSubject,
      htmlBody: confirmHtml,
      name: fromName,
    });

    return jsonResponse({ ok: true, message: "Email sent successfully" });
  } catch (err) {
    Logger.log("Error: " + err);
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function buildContactEmail(name, email, service, serviceLabel, message, fromName) {
  const messageHtml = message 
    ? "<p><strong>Message:</strong><br>" + escapeHtml(message).replace(/\n/g, "<br>") + "</p>"
    : "<p><em>No custom message provided (using service template)</em></p>";

  return (
    "<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#FEFAE0;color:#2d3319'>" +
    "<div style='background:#CCD5AE;padding:20px;border-radius:12px;margin-bottom:20px'>" +
    "<h2 style='margin:0;color:#2d3319'>New Contact Form Submission</h2>" +
    "</div>" +
    "<div style='background:white;padding:20px;border-radius:12px;border:2px solid #E0E5B6'>" +
    "<p style='font-size:16px;margin-bottom:20px'><strong>Service Requested:</strong> " + 
    escapeHtml(serviceLabel || service) + "</p>" +
    "<hr style='border:none;border-top:1px solid #E0E5B6;margin:20px 0'>" +
    "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>" +
    "<p><strong>Email:</strong> <a href='mailto:" + escapeHtml(email) + "' style='color:#5a6439'>" + 
    escapeHtml(email) + "</a></p>" +
    messageHtml +
    "<hr style='border:none;border-top:1px solid #E0E5B6;margin:20px 0'>" +
    "<p style='font-size:12px;color:#5a6439'>Received: " + new Date().toLocaleString() + "</p>" +
    "</div>" +
    "<p style='text-align:center;font-size:12px;color:#5a6439;margin-top:20px'>" +
    "Sent from " + escapeHtml(fromName) + " Contact Form</p>" +
    "</div>"
  );
}

function buildConfirmationEmail(name, service, fromName) {
  return (
    "<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#FEFAE0;color:#2d3319'>" +
    "<div style='background:#CCD5AE;padding:20px;border-radius:12px;margin-bottom:20px'>" +
    "<h2 style='margin:0;color:#2d3319'>Thank You for Contacting Us!</h2>" +
    "</div>" +
    "<div style='background:white;padding:30px;border-radius:12px;border:2px solid #E0E5B6'>" +
    "<p style='font-size:16px'>Hi " + escapeHtml(name) + ",</p>" +
    "<p>Thank you for your interest in our <strong>" + escapeHtml(service) + "</strong> service.</p>" +
    "<p>We've received your message and our team will get back to you within 24 hours.</p>" +
    "<div style='background:#FAEDCE;padding:15px;border-radius:8px;margin:20px 0'>" +
    "<p style='margin:0;font-size:14px;color:#5a6439'><strong>What's next?</strong></p>" +
    "<p style='margin:10px 0 0 0;font-size:14px;color:#5a6439'>" +
    "Our team is reviewing your request and will reach out with next steps and any questions.</p>" +
    "</div>" +
    "<p>If you have any urgent questions, feel free to reply to this email.</p>" +
    "<p style='margin-top:30px'>Best regards,<br><strong>" + escapeHtml(fromName) + " Team</strong></p>" +
    "</div>" +
    "<p style='text-align:center;font-size:12px;color:#5a6439;margin-top:20px'>" +
    "© 2026 " + escapeHtml(fromName) + ". All rights reserved.</p>" +
    "</div>"
  );
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(obj, code) {
  code = code || 200;
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
