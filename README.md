# 24 Years of Togetherness — Aai ❤️ Baba

A premium, cinematic anniversary website built with React + Tailwind CSS.

## Quick Start

```bash
cd anniversary-website
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Customization Guide

### 1. Replace Images
Edit `src/data/images.js` — replace placeholder URLs with your own:

```js
hero: {
  main: '/assets/images/hero/parents.jpg',
},
```

Place photos in `public/assets/images/` (see `public/assets/README.md`).

### 2. Replace Audio
Add your files to `public/assets/audio/`:
- `background-music.mp3` — romantic instrumental
- `voice-message.mp3` — children's voice message

### 3. Edit Text Content
All editable content lives in `src/data/`:

| File | Content |
|------|---------|
| `letters.js` | Letters from Shreya & Swanand |
| `reasons.js` | 24 reasons we love you |
| `wishes.js` | 24 wishing star messages |
| `hiddenMessages.js` | 24 secret heart notes |
| `memories.js` | Memory jar entries |
| `timeline.js` | Love story milestones |
| `stories.js` | Memory reel & polaroid albums |
| `familyTree.js` | Family member memories |
| `config.js` | Site title, dates, audio paths |

### 4. Project Structure

```
src/
├── components/
│   ├── background/     → Balloons, sparkles, particles
│   ├── layout/         → Section wrappers
│   ├── sections/       → All 14+ page sections
│   └── ui/             → Loading, music player, hidden hearts
├── data/               → All editable content & images
├── hooks/              → Scroll animation, live counter, audio
├── App.jsx
├── main.jsx
└── index.css           → Tailwind + custom animations
```

## Features

- 3-second cinematic loading screen
- Floating heart balloons with strings & glow
- 14 interactive sections + bonus future message
- Instagram-style memory reel with swipe
- Animated envelope letters
- 24 flip gift-box reason cards
- Polaroid album with lightbox
- Voice message player with waveform
- Then vs Now image slider
- Interactive family tree
- 24 wishing stars night sky
- 24 hidden heart easter eggs
- Memory jar with random picks
- Live love counter (since 21 June 2002)
- Grand finale with confetti & balloon explosion
- Floating music player
- Fully responsive, mobile-first

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- No paid libraries
- Google Fonts: Playfair Display, Cormorant Garamond, Inter

Made with ❤️ by Shreya & Swanand for Aai & Baba.
