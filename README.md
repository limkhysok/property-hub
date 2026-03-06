# 🏠 Property Hub Cambodia

A modern Angular 21 web application for discovering and listing real estate properties across all 25 provinces of Cambodia.

## ✨ Features

- **Home** — Hero section with animated title, smart property search (city/district/type/budget) with Cambodia province data
- **Properties** — Full listing page with 200 real properties (100 sale, 100 rent), live filtering by province, district, type, bedrooms, price range + sort
- **Promotions** — Active & upcoming promotions with animated bento layout and archived carousel
- **About Us** — Company story, stats, team member cards
- **Contact** — Contact form with office location details
- **Property Management** — Agent dashboard for managing personal listings

## 🛠️ Tech Stack

| Technology | Version |
|---|---|
| Angular | 21 |
| Bootstrap | 5.3 |
| Bootstrap Icons | 1.13 |
| TypeScript | 5.9 |
| DM Sans (Google Fonts) | — |

## 📦 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/         # Global navigation bar
│   │   └── footer/         # Global footer
│   ├── pages/
│   │   ├── home/           # Landing page
│   │   ├── property-list/  # Property search & listing
│   │   ├── promotion/      # Deals & promotions
│   │   ├── about/          # About us page
│   │   ├── contact/        # Contact page
│   │   └── property-management/ # Agent dashboard
│   ├── app.routes.ts       # Lazy-loaded client-side routes
│   ├── app.config.ts       # App config with preloading strategy
│   └── app.ts              # Root component with reveal animations
├── styles.css              # Global design system (tokens, utilities)
└── main.ts                 # Bootstrap entry point
data/
├── cambodia_25_provinces_districts.json  # Province/district data
├── propertiesforsale.json                # 100 sale listings
└── propertiesforrent.json                # 100 rent listings
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
# → http://localhost:4200

# Build for production
npm run build
```

## 🌐 Deploying to Vercel

1. Push the project to a GitHub repository
2. Import into [Vercel](https://vercel.com) — it will auto-detect `vercel.json`
3. Vercel will run `npm run build` and serve from `dist/property-hub/browser`
4. All routes are rewritten to `index.html` for SPA deep-link support

**No environment variables required** — all data is local JSON.

## 🎨 Design System

- **Architecture**: Sharp-edged bento grid layout (no border-radius)
- **Typography**: DM Sans — clean, geometric, modern
- **Colors**: Navy blue (`#111827`) + Electric blue (`#2563EB`)
- **Animations**: Intersection Observer scroll reveals, CSS micro-interactions

## Responsive Design  

Here are the responsive design images following the Getting Started section:

| Device      | Screenshot  |
|-------------|-------------|
| ![Laptop](path_to_laptop_image)  | ![Tablet](path_to_tablet_image)  | ![Mobile](path_to_mobile_image)  |
