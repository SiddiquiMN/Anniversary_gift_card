/**
 * ============================================================================
 *  ROMANTIC ANNIVERSARY GIFT CARD TEMPLATE — CONFIGURATION
 * ============================================================================
 *  Edit ONLY this file to customize names, dates, texts, letter, reasons,
 *  secret scratch wish, photo, background music, and theme colors.
 *  No coding knowledge required!
 * ============================================================================
 */
window.CARD_CONFIG = {
  meta: {
    pageTitle: "Happy 1st Anniversary — Alex & Mia 💍",
    brandTag: "Alex & Mia",
  },

  couple: {
    senderName: "Alex",
    partnerName: "Mia",
    coupleDisplay: "Alex & Mia",
    // Start date for the live real-time counter (Days / Hours / Mins / Secs).
    // Accepts "YYYY-MM-DD" (local midnight) or "YYYY-MM-DDTHH:mm:ss".
    anniversaryStartISO: "2025-11-14T00:00:00",
    // Leave empty ("") to auto-display "Since <Date> · Counting forever" from anniversaryStartISO,
    // or enter any custom caption text.
    sinceLabel: "",
    letterDateLabel: "November 14, 2026 · 1st Anniversary",
  },

  media: {
    // Place your couple photo inside the "assets/" folder (e.g. "assets/photo.jpg")
    photoSrc: "assets/photo.jpg",
    photoAlt: "Couple Photo",
    // Set true to let the recipient/user upload a custom photo; false keeps photoSrc fixed
    allowPhotoUpload: false,
    changePhotoButtonText: "Change Photo",

    // Place your MP3 inside "assets/" (e.g. "assets/music.mp3").
    // If missing, the card automatically falls back to built-in ambient piano chimes.
    musicSrc: "assets/music.mp3",
    musicVolume: 0.7,
  },

  theme: {
    rosePrimary: "#d64a70",
    roseDeep: "#a82e52",
    roseSoft: "#f88fa9",
    roseLight: "#fff0f4",
    gold: "#b38234",
    goldLight: "#dfb36b",
    textDark: "#4a1525",
    textMuted: "#8a485d",
  },

  screens: {
    // Slide 1: Interactive Invitation Gate
    gate: {
      badge: "🌹 ❤️ 🌹",
      title: "Happy Anniversary",
      question: '"Do you wanna see what I made for you?"',
      yesButtonText: "Wanna See 💕",
      noButtonText: "No, i don't 🙈",
      noBaitBadge: "😜 Try clicking me! 👇",
      noFunnyQuotes: [
        "No, i don't 🙈",
        "Hey, wait! 🏃‍♀️",
        "Can't touch this! 😜",
        "You can't say No to me! 💕",
        "Click 'Wanna See' please! 🥺",
        "Still trying? No chance! 😂",
        "Love is the only choice! 💍",
        "Forever yours! 🥰",
      ],
    },

    // Slide 2: Locked Ring Finger Press & Hold Screen
    story: {
      badge: "◆ One Year of Love ◆",
      title: "Our Story",
      quote:
        "From the moment our eyes met, every second has turned into a cherished memory.",
      holdHint: "Press & hold with your ring finger",
      holdCompleteHint: "She Said Yes! Forever & Always",
      ringText: "She Said Yes! 💍",
      exploreButtonText: "Swipe to Explore ✨",
      holdDurationMs: 1100,
    },

    // Slide 3: Couple Photo Frame
    photo: {
      badge: "◆ Beautiful Memory ◆",
      placeholderTitle: "Our Picture",
      placeholderHint: "Add your photo in assets/photo.jpg",
      quoteHtml:
        "Every picture tells a story, but ours will always be my <em>absolute favourite</em>.",
    },

    // Slide 4: Live Time Together Counter
    counter: {
      badge: "◆ Every Second With You ◆",
      title: "Together In Love",
      daysLabel: "Days",
      hoursLabel: "Hours",
      minutesLabel: "Minutes",
      secondsLabel: "Seconds",
    },

    // Slide 5: Love Letter & Reasons Jar
    letter: {
      icon: "💌",
      greeting: "My Dearest Mia,",
      // Each item in this array renders as a paragraph (supports <em>...</em>)
      paragraphs: [
        "A whole year has passed, and my heart still finds something <em>new to love about you</em> every single day.",
        "You are the warmth on my coldest days, the smile I look forward to, and the peace I always come home to.",
        "Thank you for choosing me and making every second unforgettable.",
      ],
      signature: "— Yours always, Alex ❤",
      reasonButtonText: "Tap for a reason why I love you!",
      reasonTapAgainText: "Tap Again ✨",
      reasonNextSlideText: "Now you can move next ✨",
      reasonPopupTitle: "Why I Love You 💕",
      reasonPopupDurationMs: 3800,
      reasons: [
        "Your smile always turns my hardest days into warmth.",
        "The way your eyes light up when you're truly excited.",
        "How safe and peaceful my heart feels beside you.",
        "The quiet laughter we share that only we understand.",
        "The kindness and patience you show every day.",
        "How you make our home feel like heaven.",
        "Simply because you are my soulmate forever.",
      ],
    },

    // Slide 6: Interactive Scratch Card
    scratch: {
      badge: "◆ A Secret For You ◆",
      title: "Scratch & Reveal",
      hint: "Scratch with your finger or mouse to unlock my wish",
      coverLabel: "✨ SCRATCH HERE ✨",
      secretHeading: "My Secret Wish ✨",
      secretMessage:
        '"My only wish is to hold your hand through every single lifetime. Happy 1st Anniversary, my soulmate!"',
      secretSignature: "— Alex 💕",
    },

    // Slide 7: Celebration Finale
    finale: {
      badge: "🥂 💖 🥂",
      title: "Happy Anniversary!",
      quote: '"Here is to 365 days of love, and a lifetime more to go!"',
      replayButtonText: "↺ Replay Story",
      shareButtonText: "↗ Share Love",
      shareTitle: "Happy 1st Anniversary — Alex & Mia 💕",
      shareText: "Celebrating one year of eternal love! Alex & Mia 💍",
      copiedMessage: "Link copied to clipboard! Share with love 💕",
    },
  },
};
