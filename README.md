# Dr. Ahmed Adel Salama — Pediatric Dentistry Website

Bilingual (English / Arabic, true RTL) marketing site + lead-capture AI
chatbot for Dr. Ahmed Adel Salama, Consultant Pediatric Dentist at Thumbay
Dental Hospital, Ajman, UAE.

Built with React + Vite + Tailwind CSS + GSAP.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Deploy `dist/` to any static host (Vercel, Netlify,
Cloudflare Pages, S3 + CloudFront, or a plain Nginx/Apache server).

## What's inside

- `src/i18n/translations.js` — **all site copy**, in English and Arabic, plus
  the doctor's contact details (`doctorInfo`). Edit this file to change any
  text, phone number, email, or address across the whole site.
- `src/components/` — one file per section (Navbar, Hero, Services, WhyUs,
  Gallery, Testimonials, Insurance, Faq, ContactForm, Footer, WhatsAppButton,
  ChatWidget).
- `public/images/` — the real clinic/patient photos and headshot supplied by
  the client.
- `CHATBOT_SYSTEM_PROMPT.md` — paste this into the n8n AI Agent node's system
  prompt field. **Deliver this alongside the site — it's the chatbot's brain.**

## Things to double-check / confirm before going live

1. **Phone & email**: currently set to Thumbay Dental Hospital's general
   front-desk line (`+971 6 746 3333` / `thajman@thumbayhospital.ae`), found
   via public sources. If Dr. Salama has a direct clinic line or WhatsApp
   number, update `doctorInfo` in `src/i18n/translations.js`.
2. **Working hours**: set to Saturday–Thursday, 9:00 AM–9:00 PM, Friday closed,
   based on the client's confirmation that Friday is off. Confirm the exact
   opening/closing times if they differ.
3. **Testimonials**: the testimonials section is explicitly labeled as sample
   content (visible on the site itself). Replace `testimonials.items` in
   `translations.js` with verified reviews from real patients as soon as
   they're available, and remove the "sample" note.
4. **Insurance**: the site intentionally does not name specific insurance
   providers, since none were confirmed. If there's a specific list of
   accepted networks, add a logo grid to `Insurance.jsx`.
5. **Chatbot webhook**: wired to
   `https://n8n.thefaisalakbar.xyz/webhook/7b041c88-cac3-4ee1-99d1-127cabc68dbc/chat`
   (this client's dedicated webhook — do not point another client's site at
   it, and don't point this site at another client's webhook).

## Language & RTL

The language toggle in the navbar switches `<html lang>` and `<html dir>`
between `en`/`ltr` and `ar`/`rtl` live — this is a real RTL layout (mirrored
nav, icons, spacing, form alignment), not just translated text in a
left-to-right shell. Arabic body/heading text uses the "IBM Plex Sans Arabic"
font; Latin text uses Poppins/Fraunces/Inter.

## Chatbot widget

- Closed state: floating launcher bottom-end with a dismissible intro bubble.
- Opening the widget shows a lead-capture form (name, phone, email, optional
  question, consent checkbox) before any chat starts — this is the conversion
  gate and is intentionally not skippable.
- After submitting, the first message (with the parent's name/phone/email/
  question) is sent to the n8n webhook automatically so the AI agent has
  context immediately, and the conversation view opens.
- The widget calls the webhook with:
  `{ action: "sendMessage", sessionId, chatInput, leadName, leadPhone, leadEmail, leadQuestion }`
  and reads the reply from `output` / `text` / `reply` / `message` /
  `response` on the JSON response (whichever the n8n workflow returns).
