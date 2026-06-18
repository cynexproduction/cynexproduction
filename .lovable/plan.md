# Plan

## 1. Backend setup
- Enable **Lovable Cloud** (Supabase) — gives us auth, DB, and server functions.
- Connect **Brevo** (recommended) or **Resend** via the connector picker. Email will be sent from `Cynexproduction7@gmail.com` once you verify that address as a sender in Brevo/Resend.
- Store any extra creds as secrets (never in code). **Rotate the Gmail app password now** — Gmail SMTP isn't used in this setup, but the password is already exposed in chat.

## 2. Database (Lovable Cloud)
- `video_slots` — `slot_key` (text, unique, e.g. `home_hero`, `about_intro`), `youtube_url` (text), `title` (text), `updated_at`. Public read, admin write.
- `form_submissions` — `id`, `form_type`, `name`, `email`, `phone`, `message`, `payload jsonb`, `created_at`. Admin read, anon insert.
- `user_roles` + `has_role()` SECURITY DEFINER function (per Lovable role pattern). One admin row inserted for your email.

## 3. Admin panel (`/admin`)
- Email/password login via Lovable Cloud.
- Protected by `_authenticated` layout + admin-role check.
- Pages:
  - **Videos** — list of known slots, paste YouTube URL per slot, save.
  - **Submissions** — table of all form entries with date/search.
- Login page at `/login`, you'll receive credentials after I create the admin user (or you sign up once and I promote you to admin).

## 4. Site-wide cleanup (all `public/site/*.html`)
- **Remove videos**: strip all `<iframe>` embeds for YouTube/Vimeo, all `.elementor-widget-video`, all `background_video` settings, all `.eaelsv-sticky-player`. Replace hero video areas with a single `<div data-cynex-video-slot="home_hero">` placeholder that `cynex-fix.js` hydrates from the `video_slots` API.
- **Remove third-party brand logos**: client-logo carousels / partner-logo sections (image filenames like client/partner/brand logos in `wp-content/uploads/`). I'll detect them by scanning carousel widgets and delete those sections.
- **Remove Hyderabad**: delete all text mentions, nav links, footer entries, schema, and the `video-production-company-in-hyderabad` page if it exists. Update sitemap, llms.txt, megamenu HTML.

## 5. Forms
- Replace existing form submit handlers with a fetch to a server function `submitForm`.
- Server fn: validate with Zod → insert into `form_submissions` → send email via Brevo/Resend gateway to `Cynexproduction7@gmail.com`.
- Works for contact, enquiry, career, popup forms.

## 6. Video slot rendering
- New endpoint `/api/public/video-slots` returns all slot URLs.
- `cynex-fix.js` fetches once, then for each `[data-cynex-video-slot="KEY"]` injects a muted/autoplay YouTube iframe (background) or a clickable poster (inline).
- If a slot is empty, the area collapses cleanly.

## Order of execution
1. Enable Cloud + connect Brevo/Resend.
2. DB migration (tables, RLS, roles, grants).
3. Server functions (`submitForm`, video CRUD) + public video-slots API.
4. Admin UI + login.
5. HTML cleanup script (videos, brand logos, Hyderabad) — one pass over all pages.
6. Update `cynex-fix.js` to hydrate slots and remove all old video-mount logic.

## Open questions before I start
- **A. Brevo or Resend?** Both work — Brevo has a more generous free tier; Resend is simpler. I'll default to **Resend** if you don't say otherwise.
- **B. Client/partner logo sections** — should I remove them entirely, or replace with a "Trusted by" placeholder you can later fill in?
- **C. Admin email** — confirm the admin login email. I'll default to `Cynexproduction7@gmail.com`. You'll set the password on first login via a reset link.
- **D. Hyderabad page** — is there an existing `/video-production-company-in-hyderabad`? I'll search and remove if found.

Reply with answers (or just "go with defaults") and I'll execute end-to-end.