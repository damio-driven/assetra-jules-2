# ASSETRA - Development Guide

## Project Overview
This project is a premium corporate presentation website for ASSETRA, a luxury interior design and contract representation firm.

## Stack
- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla)

## Directory Structure
- `assets/css/`: Stylesheets
- `assets/js/`: Client-side logic
- `assets/images/`: Stock images
- `assets/svg/`: Vector graphics (logo, etc.)
- `scripts/`: Build/Utility scripts

## Key Features
- Responsive Design (Mobile First)
- Multi-language Support (IT/EN)
- GDPR-compliant Cookie Consent
- Scroll Animations (Reveal)
- Animated Stat Counters

## Maintenance
To update images, run:
`node scripts/fetch-images.js`
(Requires `UNSPLASH_ACCESS_KEY` environment variable for Unsplash, otherwise falls back to Picsum).
