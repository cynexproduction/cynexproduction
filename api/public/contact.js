import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "Cynexproduction7@gmail.com",
    pass: "azkq pryu smqh reio",
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const body = req.body || {};
  try {
    const info = await transporter.sendMail({
      from: `"${body.name || "Website Visitor"}" <Cynexproduction7@gmail.com>`,
      to: "Cynexproduction7@gmail.com",
      replyTo: body.email || undefined,
      subject: body.subject || "Website Enquiry",
      html: [
        "<!DOCTYPE html><html><head><meta charset='UTF-8'><style>",
        "body{margin:0;padding:0;background:#f4f4f6;font-family:'Segoe UI',Arial,sans-serif}",
        ".wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08)}",
        ".head{background:linear-gradient(135deg,#6366f1,#a855f7);padding:30px 40px;text-align:center}",
        ".head h1{margin:0;color:#fff;font-size:24px;font-weight:600}",
        ".head p{margin:6px 0 0;color:rgba(255,255,255,.8);font-size:14px}",
        ".body{padding:30px 40px}",
        ".field{margin-bottom:18px}",
        ".field .lbl{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#94a3b8;margin-bottom:4px}",
        ".field .val{font-size:15px;color:#1e293b;line-height:1.5}",
        ".divider{height:1px;background:#e2e8f0;margin:20px 0}",
        ".msg{background:#f8fafc;border-radius:8px;padding:16px;font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap;border:1px solid #e2e8f0}",
        ".foot{text-align:center;padding:20px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8}",
        "</style></head><body>",
        "<div class='wrap'>",
        "<div class='head'><h1>📬 New Enquiry</h1><p>Received from cynexproduction.in</p></div>",
        "<div class='body'>",
        "<div class='field'><div class='lbl'>Name</div><div class='val'>" + (body.name || "Not provided") + "</div></div>",
        "<div class='field'><div class='lbl'>Email</div><div class='val'><a href='mailto:" + (body.email || "") + "' style='color:#6366f1;text-decoration:none'>" + (body.email || "Not provided") + "</a></div></div>",
        "<div class='field'><div class='lbl'>Phone</div><div class='val'>" + (body.phone || "Not provided") + "</div></div>",
        "<div class='field'><div class='lbl'>Subject</div><div class='val'>" + (body.subject || "Not provided") + "</div></div>",
        "<div class='field'><div class='lbl'>Source</div><div class='val'>" + (body.source || "website") + "</div></div>",
        "<div class='divider'></div>",
        "<div class='field'><div class='lbl'>Message</div><div class='msg'>" + (body.message || "No message") + "</div></div>",
        "</div>",
        "<div class='foot'>CYNEX Production &bull; www.cynexproduction.in</div>",
        "</div></body></html>",
      ].join("\n"),
    });
    console.log("Email sent:", info.messageId);
    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(200).json({ success: false, error: "Failed to send message. Please try again." });
  }
}
