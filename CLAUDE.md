# Lola Faleye Website — Project Context

## Project Overview
Modernized personal brand website for Omolola Faleye with a "Liquid Glass Duality" aesthetic (Luxury Minimal × Frosted Glass).

## Core Architecture
- **Tech Stack:** Vanilla HTML5, CSS3 (Modern features: Backdrop-filter, Grid, Flexbox), GSAP (Parallax & Entrance Animations).
- **Multi-layered Hero:** 
    - Glass plates (z-index 5).
    - Back text "Omolola" (z-index 10).
    - Portrait Image (z-index 20).
    - Front text "Faleye" (z-index 30).
- **Color System:** Theme-aware variables (`--bg-primary`, `--text-primary`, etc.) supporting Light and Dark modes.

## Current State & Decisions
- **Hero Text (Light Mode):** Decided on **solid white** text for 'Faleye' to maintain high editorial contrast over her dark jacket and glass plates.
- **Mobile Hero:** Re-architected for a clean vertical stack (Portrait -> Title -> Subtitle) to avoid absolute positioning chaos. No duplicate layers on mobile.
- **Hosting:** Account for Vercel migration is ready. Zip package `lola-faleye-vercel.zip` is on the Desktop.
- **Formspree:** `connect.html` form needs a `formspree.io` endpoint ID.

## Standard Commands
- **Local Preview:** `npx serve .` or open `index.html` in browser.
- **Deployment:** Manual upload of `lola-faleye-vercel.zip` to Vercel (avoids Netlify credits issue).

## Project Guidelines
- **Aesthetic:** High-end, editorial, "Liquid Glass". Avoid cheap glows or heavy text strokes.
- **Mobile:** Always verify vertical flow stability.
- **Navigation:** Links should use absolute filenames (e.g., `about.html`).
