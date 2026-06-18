import { createFileRoute } from "@tanstack/react-router";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { z } from "zod";
import nodemailer from "nodemailer";

const firebaseConfig = {
  apiKey: "AIzaSyCh4Nh6PRlQg17F05FII1VGt1wAPx5cqwI",
  authDomain: "cynex-production.firebaseapp.com",
  databaseURL: "https://cynex-production-default-rtdb.firebaseio.com",
  projectId: "cynex-production",
  storageBucket: "cynex-production.firebasestorage.app",
  messagingSenderId: "403679385273",
  appId: "1:403679385273:web:8699bfe6647336d2efed68",
  measurementId: "G-83Z70LEB11",
};

const app = initializeApp(firebaseConfig, "server");
const db = getFirestore(app);

const Schema = z.object({
  form_type: z.string().min(1).max(64),
  name: z.string().trim().max(200).optional().nullable(),
  email: z.string().trim().email().max(255).optional().nullable(),
  phone: z.string().trim().max(40).optional().nullable(),
  subject: z.string().trim().max(255).optional().nullable(),
  message: z.string().trim().max(5000).optional().nullable(),
  page_url: z.string().trim().max(500).optional().nullable(),
  payload: z.record(z.string(), z.any()).optional().nullable(),
});

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/submit-form")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); }
        catch { return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), { status: 400, headers: { "Content-Type": "application/json", ...CORS } }); }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) return new Response(JSON.stringify({ ok: false, error: "Validation failed" }), { status: 400, headers: { "Content-Type": "application/json", ...CORS } });
        try {
          await addDoc(collection(db, "form_submissions"), { ...parsed.data, created_at: Timestamp.now().toDate().toISOString() });

          const { name, email, phone, message, form_type } = parsed.data;
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"${name || "Website Visitor"}" <${process.env.SMTP_USER}>`,
            replyTo: email || process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New ${form_type} from ${name || "anonymous"} - CYNEX Production`,
            html: `
              <h2>New Form Submission: ${form_type}</h2>
              <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-family:sans-serif;">
                ${name ? `<tr><td><strong>Name</strong></td><td>${name}</td></tr>` : ""}
                ${email ? `<tr><td><strong>Email</strong></td><td>${email}</td></tr>` : ""}
                ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ""}
                ${message ? `<tr><td><strong>Message</strong></td><td>${message}</td></tr>` : ""}
                <tr><td><strong>Page</strong></td><td>${parsed.data.page_url || "N/A"}</td></tr>
                <tr><td><strong>Time</strong></td><td>${new Date().toLocaleString()}</td></tr>
              </table>
            `,
          });

          return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json", ...CORS } });
        } catch (err: any) {
          return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers: { "Content-Type": "application/json", ...CORS } });
        }
      },
    },
  },
});
