# Dr. Ahmed Adel Salama | Pediatric Dentistry Website

A bilingual pediatric dentistry marketing website for Dr. Ahmed Adel Salama, built with React, Vite, Tailwind CSS, and GSAP. The site includes:

- English and Arabic content with true RTL support
- Lead generation contact form
- WhatsApp contact button
- Floating AI chat widget for parent enquiries
- Responsive, modern clinic branding for a premium dental practice

## Live demo

Local development:

```bash
npm install
npm run dev
```

Default local URL:

```text
http://localhost:5173/
```

## Production build

```bash
npm run build
```

The generated app is placed in the `dist/` folder and is ready for deployment to static hosts.

## Deploy to GitHub Pages

This project is configured for a GitHub Pages project site using the repo name `dr-ahmed-salama`.

Run:

```bash
npm run deploy:gh-pages
```

Then publish the `dist/` folder using GitHub Pages or a GitHub Actions workflow.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Use the default Vite settings.
4. Deploy.

No extra config is required for Vercel because the app is a standard Vite SPA.

## Project structure

```text
.
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── components/
│   ├── i18n/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── CHATBOT_SYSTEM_PROMPT.md
├── README.md
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## Key files to edit

- `src/i18n/translations.js` — page copy, contact info, doctor details, language strings
- `src/components/` — sections such as Hero, Services, Gallery, Footer, FAQ, Contact form
- `public/images/` — clinic photos, headshot, and gallery assets
- `CHATBOT_SYSTEM_PROMPT.md` — system prompt for the AI chatbot workflow

## Important before launch

Before going live, please confirm:

1. Direct clinic phone number / WhatsApp contact
2. Real patient reviews for the Testimonials section
3. Exact clinic hours and accepted insurance plans
4. Final patient photos and brand imagery for the gallery
5. The live n8n webhook URL used by the chat widget

## Tech stack

- React 19
- Vite 6
- Tailwind CSS 3
- GSAP for animation
- Lucide React icons

## Deployment notes

- GitHub Pages: use `npm run deploy:gh-pages`
- Vercel: use the default `npm run build` deployment flow
- The app is a SPA, so static hosting works well for both options

## Chatbot integration

The floating chat widget is wired to the live n8n webhook configured in the project. If the webhook changes, update the URL in the relevant chat component before publishing.
