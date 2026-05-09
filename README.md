# 2026 World Cup Ticket Bracket Helper

Ticketmaster listings for the 2026 FIFA World Cup knockout stage often use placeholders like `A1`, `B2`, `TP3`, `W79`, and `W80` instead of actual team names.

That makes it hard to answer the question fans really care about:

> If I buy this match ticket, which teams could I realistically be watching?

This project turns those placeholders into a readable, interactive bracket. Pick your predicted group-stage results, and the knockout bracket automatically fills in with real teams, match dates, host cities, venues, and ticket links.

## Live Demo

https://zhiyuantao623.github.io/world_cup_simulation/

## Why This Exists

When browsing World Cup tickets, a listing like `1B vs. TBD` or `W79 vs. W80` is technically correct, but not very useful for planning.

This app helps fans:

- Map group-stage predictions into knockout-stage matchups
- Understand which teams could appear in each city
- Compare match dates and venues more quickly
- Jump from a bracket match to a relevant ticket page
- Switch between English and Chinese team names

## Features

- Interactive group-stage picker for all 12 groups
- Best third-place team selection
- Auto-generated Round of 32 through Final bracket
- Winner picking all the way to a champion
- Match city, venue, and date display
- Ticketmaster/FIFA ticket links per knockout match
- English/Chinese language toggle
- Chinese translations for country names
- Responsive layout for desktop and mobile
- Local storage so predictions stay after refresh

## Screenshots

Add screenshots here after deployment:

```md
![World Cup bracket helper screenshot](public/preview.png)
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- GitHub Pages
- GitHub Actions

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

This repository is configured to deploy automatically to GitHub Pages.

On every push to `main`, GitHub Actions will:

1. Install dependencies
2. Build the Vite app
3. Upload the `dist` folder
4. Deploy to GitHub Pages

## Roadmap

- Shareable prediction links
- Export bracket as an image
- Better mobile bracket navigation
- City-based match filtering
- Favorite-team route finder
- More ticket availability notes

## Disclaimer

This is a fan-made planning tool and is not affiliated with FIFA, Ticketmaster, or any official World Cup organizer.

Ticket links and match details may change. Always verify ticket availability, venue details, and official information before purchasing.

## Support

If this helps you understand the 2026 World Cup ticket bracket, a GitHub star would mean a lot.
