# Protofolio

Animated personal portfolio built with React + Vite and Tailwind CSS.

## Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Animations: Framer Motion (recommended for portfolios)
- Icons: Lucide React + React Icons
- Deployment: Vercel or Netlify

## Why Framer Motion for portfolios?

Framer Motion is a strong default for portfolio projects because it is React-native, has clean APIs for page/section transitions, and ships smooth production-grade motion with less setup than GSAP/AOS for common UI effects.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

### Vercel

1. Push this repo to GitHub.
2. In Vercel, click New Project and import the repository.
3. Keep defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

### Netlify

1. Push this repo to GitHub.
2. In Netlify, click Add new site -> Import an existing project.
3. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.
