# Xplormate Operations AI

Xplormate is an AI transformation landing page for manufacturing operations. It helps production, quality, maintenance, materials, and plant leaders identify a focused workflow where AI could improve the next action.

## Run locally

Use Node.js 22 or newer:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Validate a change

```bash
npm run lint
npm run build
```

The lead form posts to `/api/leads`. The endpoint validates the required name, email, company, and role fields and returns a clear field-level error when a value is missing or invalid. Lead storage and notification delivery can be added when the operating workflow is defined.

## Deploy to Vercel

Import the repository into Vercel. Vercel detects the Next.js app automatically:

- Build command: `npm run build`
- Output directory: leave the default
- Install command: `npm install` (or Vercel's detected package-manager command)

Set `NEXT_PUBLIC_SITE_URL` to the production URL or custom domain so canonical and social metadata use the correct origin. Vercel's `VERCEL_URL` is used automatically for previews when this variable is not set.

## Project shape

- `app/page.tsx` contains the landing page and interactive opportunity explorer.
- `app/globals.css` contains the visual system and responsive layout.
- `app/api/leads/route.ts` validates lead submissions on the server.
- `public/` contains the Xplormate logo and manufacturing imagery.
