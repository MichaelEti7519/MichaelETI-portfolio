# Micheal Eti - Software Engineer Portfolio

Personal portfolio for Micheal Eti, a software engineer building web, mobile, backend, AI, and real-time applications.

The site is an interactive single-page experience with project case studies, skills, GitHub repository browsing, a contact form, theme switching, motion, and a Three.js developer workstation scene.

## Highlights

- Responsive React and TypeScript portfolio experience
- Light and dark themes with reduced-motion support
- Project showcase with architecture notes, technologies, and GitHub links
- Interactive GitHub repository section with search and language filters
- Three.js desktop and laptop scenes with local model and texture assets
- Contact form with server validation, honeypot protection, rate limiting, and a browser fallback log

## Tech Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Three.js
- Motion and GSAP
- Express and Node.js for the local API server
- Lucide React for icons

## Run Locally

**Prerequisites:** Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### EmailJS Configuration

For the Vercel deployment, create an EmailJS service and email template, then add these Vercel environment variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The EmailJS template should use `from_name`, `reply_to`, `subject`, and `message` variables. The public key is safe to expose in a frontend build; keep private provider secrets out of `VITE_` variables.

The development server runs the Express API and Vite together. The available local endpoints are:

- `GET /api/health` - backend health check
- `GET /api/repos` - cached repository data with optional `q` and `lang` filters
- `POST /api/contact` - validated contact form submissions

## Production Build

```bash
npm run build
npm start
```

`npm run build` creates the Vite frontend in `dist/` and bundles the Express server as `dist/server.cjs`. `npm start` serves the production build and API from port `3000`.

To run the TypeScript check:

```bash
npm run lint
```

## Deploy To Vercel

The portfolio frontend can be deployed to Vercel as a Vite site:

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Use the default project settings, or set:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy.

The current Vercel setup is frontend-first. The Express server in `server.ts` is used for local development and traditional Node hosting; Vercel will not automatically run it as a serverless API. The GitHub repository section has local fallback data, while the contact form uses EmailJS when the variables above are configured.

For server-side contact validation and repository endpoints in production, move those handlers into Vercel Functions under `api/`, or deploy the Express server separately and configure the frontend API base URL.

## Project Structure

```text
src/
  components/       Portfolio sections and interactive UI
  components/coder/ Three.js workstation and code-screen scenes
  components/showcase/ Project-specific visual showcases
  context/           Theme state
  data/              Portfolio content and project metadata
  services/          Contact submission and fallback logging
  lib/               Shared animation variants
public/              Models, textures, and Draco decoder assets
server.ts            Local Express API and production Node server
```

## Notes

- Portfolio content is maintained in [src/data/portfolioData.ts](src/data/portfolioData.ts).
- Successful contact submissions are stored as a limited browser audit log in `localStorage`; that log is not a replacement for email delivery or a production database.
- Three.js assets in `public/` are required for the workstation scenes to render correctly.

## License

This portfolio is a personal project. The 3D assets retain the licenses included in their respective asset directories.
