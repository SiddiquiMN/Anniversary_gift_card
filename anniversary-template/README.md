# Interactive Romantic Anniversary Gift Card — Template

A responsive, multi-slide digital anniversary / proposal gift card template built with HTML5, CSS3, and Vanilla JavaScript. Every name, date, message, love reason, secret scratch wish, photo, song, and theme color can be customized from **one file (`config.js`)**.

---

## Folder Structure

```text
anniversary-template/
├── index.html          # Main page layout & SVG ring animation
├── config.js           # ★ Edit all names, texts, dates, media & colors here
├── styles.css          # Styling, animations & responsive design
├── app.js              # Interactive engine powered by config.js
├── assets/
│   ├── photo.jpg       # (Add yours) Couple photo for Slide 3
│   └── music.mp3       # (Optional) Background song MP3
└── README.md
```

---

## Quick Start (3 Steps)

1. **Customize Texts & Names**
   Open `config.js` in any text editor (VS Code, Notepad, etc.) and edit the values inside `window.CARD_CONFIG`:
   - `meta`: Browser tab title and top-left brand tag.
   - `couple`: Sender name, partner name, `anniversaryStartISO` (`YYYY-MM-DDTHH:mm:ss`) for the live time counter, and date labels.
   - `theme`: Hex colors for primary rose, gold, and text.
   - `screens`: Every heading, quote, button label, love letter paragraphs, reasons popup list, scratch-card secret wish, and share text.

2. **Add Your Photo & Music**
   - Put your couple photo at `assets/photo.jpg` (or update `media.photoSrc` in `config.js`).
   - Put your background song at `assets/music.mp3` (or update `media.musicSrc` in `config.js`). If no MP3 is provided, the built-in romantic ambient synthesizer plays automatically.
   - Want visitors to be able to upload a photo? Set `media.allowPhotoUpload: true` in `config.js`.

3. **Preview & Deploy**
   - **Local Preview:** Double-click `index.html` to open directly in any browser (no build tools or server required).
   - **Free Hosting:** Upload the `anniversary-template/` folder contents to **GitHub Pages**, **Netlify Drop**, **Vercel**, or any static web host.

---

## Included Interactive Features

- **Slide 1 — Tempting Runaway Gate:** Glowing, bouncing `"No"` button with customizable bait badge that smoothly glides away from the cursor on desktop and dodges taps on mobile, plus mobile pull-to-refresh on the landing screen.
- **Slide 2 — Locked Ring Finger Reveal:** Locked until the user presses and holds the ring circle to complete the progress animation, revealing an animated custom SVG hand where a diamond ring slips onto the ring finger, followed by a `"Swipe to Explore"` button.
- **Slide 3 — Memory Photo Frame:** Fixed couple photo (with optional upload mode in `config.js`).
- **Slide 4 — Live Love Counter:** Real-time Days, Hours, Minutes, and Seconds since `anniversaryStartISO`.
- **Slide 5 — Love Letter & Reasons Jar:** Personalized letter card + SweetAlert2 draining progress popups that guide the reader (`Tap Again` → `Now you can move next`) and advance to the next slide after all reasons are viewed.
- **Slide 6 — Scratch & Reveal Wish:** Interactive canvas scratch card with confetti celebration on reveal.
- **Slide 7 — Celebration Finale:** Fireworks animation, replay story, and Web Share / copy-link button.
