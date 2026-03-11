# Path2Action

Turn your civic idea into real action. Path2Action helps young activists plan and execute civic campaigns with step-by-step guidance and ready-to-use templates.

## About

Path2Action is a web application designed to empower young changemakers by providing:

- **Campaign Planning Wizard** - 10-step guided process to plan your civic action
- **Venue Finder** - Find and book venues for your events in Yerevan
- **Resource Templates** - Ready-to-use materials for your campaigns

## Technology Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

## Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Pre-Launch Checklist

Before deploying to production:

1. **Mapbox Token** - Move token from `src/lib/mapbox.ts` to secure storage
2. **EmailJS Credentials** - Configure production values in `src/lib/emailjs.ts`
3. **Venue Emails** - Update owner emails in `src/data/venues.ts`
4. **Social Image** - Add your own `og-image.png` to the `public/` folder (1200x630px recommended)
