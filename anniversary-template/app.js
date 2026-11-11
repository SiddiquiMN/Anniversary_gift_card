/* ═══════════════════════════════════════════════════════════════════════════
   ANNIVERSARY GIFT CARD TEMPLATE — CORE APPLICATION ENGINE
   All customizable copy, names, dates, assets, and theme colors are loaded
   from window.CARD_CONFIG (defined in config.js).
═══════════════════════════════════════════════════════════════════════════ */

const CFG = window.CARD_CONFIG || {};
const META = CFG.meta || {};
const COUPLE = CFG.couple || {};
const MEDIA = CFG.media || {};
const THEME = CFG.theme || {};
const SCREENS = CFG.screens || {};
const GATE = SCREENS.gate || {};
const STORY = SCREENS.story || {};
const PHOTO_CFG = SCREENS.photo || {};
const COUNTER_CFG = SCREENS.counter || {};
const LETTER = SCREENS.letter || {};
const SCRATCH = SCREENS.scratch || {};
const FINALE = SCREENS.finale || {};

function setText(id, val) {
  const el = document.getElementById(id);
  if (el && typeof val === "string") el.textContent = val;
}

function applyTheme() {
  const root = document.documentElement.style;
  const map = {
    "--rose-primary": THEME.rosePrimary,
    "--rose-deep": THEME.roseDeep,
    "--rose-soft": THEME.roseSoft,
    "--rose-light": THEME.roseLight,
    "--gold": THEME.gold,
    "--gold-light": THEME.goldLight,
    "--text-dark": THEME.textDark,
    "--text-muted": THEME.textMuted,
  };
  Object.entries(map).forEach(([cssVar, color]) => {
    if (color) root.setProperty(cssVar, color);
  });
}

function hydrateTemplateFromConfig() {
  applyTheme();

  if (META.pageTitle) document.title = META.pageTitle;
  setText("brand-tag", META.brandTag || COUPLE.coupleDisplay);

  // S1 — Gate
  setText("gate-badge", GATE.badge);
  setText("gate-title", GATE.title);
  setText("gate-names", COUPLE.coupleDisplay);
  setText("gate-question", GATE.question);
  setText("btn-yes", GATE.yesButtonText);

  const noBtnEl = document.getElementById("btn-no");
  if (noBtnEl) {
    if (GATE.noButtonText) noBtnEl.textContent = GATE.noButtonText;
    if (GATE.noBaitBadge) noBtnEl.setAttribute("data-bait", GATE.noBaitBadge);
  }

  // S2 — Story / Ring
  setText("story-badge", STORY.badge);
  setText("story-title", STORY.title);
  setText("story-quote", STORY.quote);
  setText("ring-text", STORY.ringText);

  const ringHintEl = document.getElementById("ring-hint");
  if (ringHintEl && STORY.holdHint) {
    ringHintEl.innerHTML = `<span>✨</span> ${STORY.holdHint} <span>💍</span>`;
  }
  const explorePillEl = document.getElementById("explore-pill");
  if (explorePillEl && STORY.exploreButtonText) {
    explorePillEl.innerHTML = `${STORY.exploreButtonText}`;
  }

  // S3 — Photo
  setText("photo-badge", PHOTO_CFG.badge);
  setText("photo-ph-title", PHOTO_CFG.placeholderTitle);
  setText("photo-ph-hint", PHOTO_CFG.placeholderHint);
  setText("change-photo-label", MEDIA.changePhotoButtonText);

  const photoQuoteEl = document.getElementById("photo-quote");
  if (photoQuoteEl && PHOTO_CFG.quoteHtml) {
    photoQuoteEl.innerHTML = PHOTO_CFG.quoteHtml;
  }

  const couplePhotoEl = document.getElementById("couple-photo");
  if (couplePhotoEl) {
    if (MEDIA.photoSrc) couplePhotoEl.src = MEDIA.photoSrc;
    if (MEDIA.photoAlt) couplePhotoEl.alt = MEDIA.photoAlt;
  }

  const s3El = document.getElementById("s3");
  const photoWrapperEl = document.getElementById("photo-wrapper");
  if (MEDIA.allowPhotoUpload && s3El) {
    s3El.classList.add("upload-enabled");
    if (photoWrapperEl) {
      photoWrapperEl.addEventListener("click", triggerPhotoUpload);
    }
  }

  // S4 — Counter
  setText("counter-badge", COUNTER_CFG.badge);
  setText("counter-title", COUNTER_CFG.title);
  setText("lbl-days", COUNTER_CFG.daysLabel);
  setText("lbl-hours", COUNTER_CFG.hoursLabel);
  setText("lbl-mins", COUNTER_CFG.minutesLabel);
  setText("lbl-secs", COUNTER_CFG.secondsLabel);
  setText("counter-since", COUPLE.sinceLabel);

  // S5 — Love Letter & Reason Jar
  setText("letter-icon", LETTER.icon);
  setText("letter-greeting", LETTER.greeting);
  setText("letter-sig", LETTER.signature);
  setText("letter-date", COUPLE.letterDateLabel);

  const letterBodyEl = document.getElementById("letter-body");
  if (letterBodyEl && Array.isArray(LETTER.paragraphs)) {
    letterBodyEl.innerHTML = LETTER.paragraphs.join("<br /><br />");
  }
  const reasonPillEl = document.getElementById("reason-pill");
  if (reasonPillEl && LETTER.reasonButtonText) {
    reasonPillEl.innerHTML = `<span>💌</span> ${LETTER.reasonButtonText}`;
  }

  // S6 — Scratch Card
  setText("scratch-badge", SCRATCH.badge);
  setText("scratch-title", SCRATCH.title);
  setText("scratch-hint", SCRATCH.hint);
  setText("scratch-secret-heading", SCRATCH.secretHeading);
  setText("scratch-secret-message", SCRATCH.secretMessage);
  setText("scratch-secret-signature", SCRATCH.secretSignature);

  // S7 — Finale
  setText("finale-badge", FINALE.badge);
  setText("finale-title", FINALE.title);
  setText("finale-names", COUPLE.coupleDisplay);
  setText("finale-quote", FINALE.quote);
  setText("replay-btn", FINALE.replayButtonText);
  setText("share-btn", FINALE.shareButtonText);

  // Audio source
  const bgMusicEl = document.getElementById("bg-music");
  if (bgMusicEl && MEDIA.musicSrc) {
    bgMusicEl.src = MEDIA.musicSrc;
  }
}

hydrateTemplateFromConfig();

/* ──────────────────────────────────────────────
   1. BUILT-IN WEB AUDIO SYNTHESIZER (FALLBACK + CHIMES)
────────────────────────────────────────────── */
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playRomanticChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }, i * 110);
    });
  } catch (e) {}
}

function playWhooshSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(260 + Math.random() * 80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      650 + Math.random() * 200,
      ctx.currentTime + 0.22,
    );
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

function playEngagementChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.4);
      }, i * 90);
    });
  } catch (e) {}
}

let ambientInterval = null;
let isAmbientPlaying = false;
function toggleAmbientMusic() {
  if (isAmbientPlaying) {
    clearInterval(ambientInterval);
    isAmbientPlaying = false;
    document.getElementById("music-btn").classList.add("muted");
    document.getElementById("music-btn").innerHTML = "♪";
    return;
  }
  try {
    const ctx = getAudioContext();
    isAmbientPlaying = true;
    document.getElementById("music-btn").classList.remove("muted");
    document.getElementById("music-btn").innerHTML = "♫";

    const chords = [
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 392.0],
      [174.61, 220.0, 261.63, 329.63],
      [196.0, 246.94, 293.66, 392.0],
    ];
    let chordIndex = 0;

    function playChord() {
      if (!isAmbientPlaying) return;
      const chord = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.022, ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 4.0);
      });
    }

    playChord();
    ambientInterval = setInterval(playChord, 3800);
  } catch (e) {}
}

document.getElementById("sound-btn").addEventListener("click", () => {
  playRomanticChime();
});

/* ──────────────────────────────────────────────
   2. SCREEN MANAGEMENT & LOCKED PROGRESSION
────────────────────────────────────────────── */
const screens = ["s1", "s2", "s3", "s4", "s5", "s6", "s7"];
const totalScreens = screens.length;
let currentScreen = 0;
let isAnimating = false;

let hasUnlockedGate = false;
let hasWornRing = false;
let reasonIdx = 0;
let canMoveNextFromReasons = false;

function shakeRingPrompt() {
  const hint = document.getElementById("ring-hint");
  const ringBox = document.getElementById("ring-box");
  if (hint) {
    hint.classList.add("shake-hint");
    setTimeout(() => hint.classList.remove("shake-hint"), 600);
  }
  if (ringBox) {
    ringBox.classList.add("shake-ring");
    setTimeout(() => ringBox.classList.remove("shake-ring"), 600);
  }
}

function shakeReasonPrompt() {
  const pill = document.getElementById("reason-pill");
  if (pill) {
    pill.classList.remove("shake-btn");
    void pill.offsetWidth;
    pill.classList.add("shake-btn");
    setTimeout(() => pill.classList.remove("shake-btn"), 550);
  }
}

function unlockGateAndProceed() {
  hasUnlockedGate = true;
  playMusic();
  goToScreen(1);
}

const dotsContainer = document.getElementById("dots-container");
screens.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " on" : "");
  dot.id = "dot-" + i;
  dot.addEventListener("click", () => {
    if (currentScreen === 0 && !hasUnlockedGate) return;
    if (currentScreen === 1 && !hasWornRing) {
      shakeRingPrompt();
      return;
    }
    if (currentScreen === 4 && i > 4 && !canMoveNextFromReasons) {
      shakeReasonPrompt();
      return;
    }
    goToScreen(i);
  });
  dotsContainer.appendChild(dot);
});

function updateNavControls() {
  const isScreen1Locked = currentScreen === 1 && !hasWornRing;
  const isScreen4ForwardLocked = currentScreen === 4 && !canMoveNextFromReasons;
  document
    .getElementById("arr-left")
    .classList.toggle("hide", currentScreen === 0 || isScreen1Locked);
  const hideRight =
    currentScreen === 0 ||
    isScreen1Locked ||
    isScreen4ForwardLocked ||
    currentScreen === totalScreens - 1;
  document.getElementById("arr-right").classList.toggle("hide", hideRight);
  dotsContainer.style.display =
    currentScreen === 0 || isScreen1Locked ? "none" : "flex";
}
updateNavControls();

function goToScreen(targetIndex) {
  if (currentScreen === 0 && targetIndex > 0 && !hasUnlockedGate) {
    return;
  }
  if (currentScreen === 1 && targetIndex !== 1 && !hasWornRing) {
    shakeRingPrompt();
    return;
  }
  if (currentScreen === 4 && targetIndex > 4 && !canMoveNextFromReasons) {
    shakeReasonPrompt();
    return;
  }

  if (
    isAnimating ||
    targetIndex === currentScreen ||
    targetIndex < 0 ||
    targetIndex >= totalScreens
  )
    return;
  isAnimating = true;

  playRomanticChime();

  const currentEl = document.getElementById(screens[currentScreen]);
  const targetEl = document.getElementById(screens[targetIndex]);
  const currentDot = document.getElementById("dot-" + currentScreen);
  const targetDot = document.getElementById("dot-" + targetIndex);

  currentEl.classList.remove("active");
  if (currentDot) currentDot.classList.remove("on");

  currentScreen = targetIndex;

  targetEl.classList.add("active");
  if (targetDot) targetDot.classList.add("on");

  if (currentScreen === 0) {
    hasUnlockedGate = false;
    hasWornRing = false;
    reasonIdx = 0;
    canMoveNextFromReasons = false;
    const reasonPill = document.getElementById("reason-pill");
    if (reasonPill) {
      reasonPill.classList.remove("ready-next");
      const btnTxt =
        LETTER.reasonButtonText || "Tap for a reason why I love you!";
      reasonPill.innerHTML = `<span>💌</span> ${btnTxt}`;
    }
    resetRingState();
    resetNoButtonPosition();
  }

  updateNavControls();

  if (currentScreen === 5) {
    initScratchCard();
  }
  if (currentScreen === totalScreens - 1) {
    triggerCelebration();
  }

  setTimeout(() => {
    isAnimating = false;
  }, 450);
}

function nextScreen() {
  if (currentScreen === 0 && !hasUnlockedGate) return;
  if (currentScreen === 1 && !hasWornRing) {
    shakeRingPrompt();
    return;
  }
  if (currentScreen === 4 && !canMoveNextFromReasons) {
    shakeReasonPrompt();
    return;
  }
  goToScreen(currentScreen + 1);
}

function prevScreen() {
  if (currentScreen === 1 && !hasWornRing) {
    shakeRingPrompt();
    return;
  }
  goToScreen(currentScreen - 1);
}

document.addEventListener("keydown", (e) => {
  if (currentScreen === 0 && !hasUnlockedGate) return;
  if (currentScreen === 1 && !hasWornRing) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === " ") {
      shakeRingPrompt();
    }
    return;
  }
  if (currentScreen === 4 && !canMoveNextFromReasons) {
    if (e.key === "ArrowRight" || e.key === " ") {
      shakeReasonPrompt();
      return;
    }
  }
  if (e.key === "ArrowRight" || e.key === " ") nextScreen();
  if (e.key === "ArrowLeft") prevScreen();
});

/* ──────────────────────────────────────────────
   GESTURE SLIDE, TOUCH PULL-TO-REFRESH & WHEEL
────────────────────────────────────────────── */
let gestureStartX = 0;
let gestureStartY = 0;
let isMouseDragging = false;
let mouseMovedSignificant = false;

function handleGestureSwipe(deltaX, deltaY) {
  if (currentScreen === 0 && !hasUnlockedGate) return;
  if (currentScreen === 1 && !hasWornRing) {
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 0.7) {
      shakeRingPrompt();
    }
    return;
  }
  if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 0.7) {
    if (deltaX < 0) {
      if (currentScreen === 4 && !canMoveNextFromReasons) {
        shakeReasonPrompt();
        return;
      }
      nextScreen();
    } else {
      prevScreen();
    }
  }
}

const ptrIndicator = document.getElementById("ptr-indicator");
const ptrSpinner = document.getElementById("ptr-spinner");
let ptrStartX = 0;
let ptrStartY = 0;
let isPtrTracking = false;
let ptrPullOffset = 0;
let isPtrRefreshing = false;

document.addEventListener(
  "touchstart",
  (e) => {
    if (
      e.target.closest(
        "#scratch-canvas, .btn-no, .btn-yes, input, button, .ring-interactive-wrap",
      )
    )
      return;
    const touch = e.touches[0];
    gestureStartX = touch.clientX;
    gestureStartY = touch.clientY;

    if (currentScreen === 0 && !isPtrRefreshing) {
      ptrStartX = touch.clientX;
      ptrStartY = touch.clientY;
      ptrPullOffset = 0;
      isPtrTracking = true;
    }
  },
  { passive: true },
);

document.addEventListener(
  "touchmove",
  (e) => {
    if (!isPtrTracking || currentScreen !== 0 || isPtrRefreshing) return;
    const touch = e.touches[0];
    const dx = touch.clientX - ptrStartX;
    const dy = touch.clientY - ptrStartY;

    if (dy > 10 && dy > Math.abs(dx) * 1.15) {
      ptrPullOffset = Math.min(102, dy * 0.62);
      if (ptrIndicator && ptrSpinner) {
        ptrIndicator.classList.add("pulling");
        const scale = 0.85 + Math.min(0.2, ptrPullOffset / 450);
        ptrIndicator.style.opacity = Math.min(1, ptrPullOffset / 42);
        ptrIndicator.style.transform = `translateX(-50%) translateY(${ptrPullOffset}px) scale(${scale})`;
        ptrSpinner.style.transform = `rotate(${dy * 2.4}deg)`;
      }
    } else if (Math.abs(dx) > 25 && dy < 15) {
      isPtrTracking = false;
      ptrPullOffset = 0;
      if (ptrIndicator && ptrSpinner) {
        ptrIndicator.classList.remove("pulling");
        ptrIndicator.style.opacity = "";
        ptrIndicator.style.transform = "";
        ptrSpinner.style.transform = "";
      }
    }
  },
  { passive: true },
);

function finishPtrTouch() {
  if (!isPtrTracking) return;
  isPtrTracking = false;
  if (!ptrIndicator || !ptrSpinner) return;

  ptrIndicator.classList.remove("pulling");
  if (currentScreen === 0 && ptrPullOffset >= 56 && !isPtrRefreshing) {
    isPtrRefreshing = true;
    ptrIndicator.style.opacity = "";
    ptrIndicator.style.transform = "";
    ptrSpinner.style.transform = "";
    ptrIndicator.classList.add("refreshing");
    setTimeout(() => {
      window.location.reload();
    }, 550);
  } else {
    ptrPullOffset = 0;
    ptrIndicator.style.opacity = "";
    ptrIndicator.style.transform = "";
    ptrSpinner.style.transform = "";
  }
}

document.addEventListener(
  "touchend",
  (e) => {
    finishPtrTouch();
    if (
      e.target.closest(
        "#scratch-canvas, .btn-no, .btn-yes, input, button, .ring-interactive-wrap",
      )
    )
      return;
    const deltaX = e.changedTouches[0].clientX - gestureStartX;
    const deltaY = e.changedTouches[0].clientY - gestureStartY;
    handleGestureSwipe(deltaX, deltaY);
  },
  { passive: true },
);

document.addEventListener("touchcancel", finishPtrTouch, { passive: true });

document.addEventListener("mousedown", (e) => {
  if (
    e.target.closest(
      "#scratch-canvas, .btn-no, .btn-yes, input, button, .nav-arr, .icon-btn, .reason-pill, .upload-pill, .ring-interactive-wrap",
    )
  )
    return;
  isMouseDragging = true;
  mouseMovedSignificant = false;
  gestureStartX = e.clientX;
  gestureStartY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isMouseDragging) return;
  const dist = Math.hypot(
    e.clientX - gestureStartX,
    e.clientY - gestureStartY,
  );
  if (dist > 12) mouseMovedSignificant = true;
});

document.addEventListener("mouseup", (e) => {
  if (!isMouseDragging) return;
  isMouseDragging = false;
  if (!mouseMovedSignificant) return;
  const deltaX = e.clientX - gestureStartX;
  const deltaY = e.clientY - gestureStartY;
  handleGestureSwipe(deltaX, deltaY);
});

let wheelCooldown = false;
document.addEventListener(
  "wheel",
  (e) => {
    if (currentScreen === 0 && !hasUnlockedGate) return;
    if (wheelCooldown) return;
    if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
      wheelCooldown = true;
      const goingForward = e.deltaY > 0 || e.deltaX > 0;
      if (currentScreen === 1 && !hasWornRing) {
        shakeRingPrompt();
      } else if (
        currentScreen === 4 &&
        goingForward &&
        !canMoveNextFromReasons
      ) {
        shakeReasonPrompt();
      } else if (goingForward) {
        nextScreen();
      } else {
        prevScreen();
      }
      setTimeout(() => {
        wheelCooldown = false;
      }, 550);
    }
  },
  { passive: true },
);

/* ──────────────────────────────────────────────
   RING INTERACTION: PRESS & HOLD FOR ENGAGEMENT ANIMATION
────────────────────────────────────────────── */
const ringWrap = document.getElementById("ring-interactive-wrap");
const ringChargeBar = document.getElementById("ring-charge-bar");
const ringBox = document.getElementById("ring-box");
const ringHint = document.getElementById("ring-hint");
const explorePill = document.getElementById("explore-pill");
let ringHoldTimer = null;
let ringHoldStart = 0;
let isRingHolding = false;
let isProposing = false;
const RING_HOLD_DURATION = Number(STORY.holdDurationMs) || 1100;

function resetRingState() {
  isProposing = false;
  isRingHolding = false;
  if (ringHoldTimer) {
    cancelAnimationFrame(ringHoldTimer);
    ringHoldTimer = null;
  }
  if (ringBox) {
    ringBox.classList.remove("proposed");
    ringBox.classList.remove("holding");
  }
  if (ringChargeBar) ringChargeBar.style.strokeDashoffset = "528";
  if (ringHint) {
    const holdTxt = STORY.holdHint || "Press & hold with your ring finger";
    ringHint.innerHTML = `<span>✨</span> ${holdTxt} <span>💍</span>`;
    ringHint.style.borderColor = "";
    ringHint.style.color = "";
    ringHint.style.background = "";
  }
  if (explorePill) {
    explorePill.classList.remove("visible");
  }
}

function triggerEngagementProposal() {
  if (isProposing) return;
  isProposing = true;
  isRingHolding = false;

  if (ringHoldTimer) {
    cancelAnimationFrame(ringHoldTimer);
    ringHoldTimer = null;
  }

  if (ringChargeBar) {
    ringChargeBar.style.strokeDashoffset = "0";
  }

  playEngagementChime();

  if (ringBox) {
    ringBox.classList.add("holding");
    ringBox.classList.add("proposed");
  }
  if (ringHint) {
    const doneTxt = STORY.holdCompleteHint || "She Said Yes! Forever & Always";
    ringHint.innerHTML = `<span>💖</span> ${doneTxt} <span>💍</span>`;
    ringHint.style.borderColor = "var(--rose-primary)";
    ringHint.style.color = "var(--rose-deep)";
    ringHint.style.background = "#fff";
  }

  if (ringBox) {
    const rect = ringBox.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 28; i++) {
      addSparkle(
        cx + (Math.random() - 0.5) * 80,
        cy + (Math.random() - 0.5) * 80,
      );
    }
  }

  hasWornRing = true;
  updateNavControls();
  if (explorePill) {
    setTimeout(() => {
      if (currentScreen === 1 && hasWornRing) {
        explorePill.classList.add("visible");
      }
    }, 350);
  }
}

function startRingHold(e) {
  if (currentScreen !== 1 || isProposing || isRingHolding) return;
  if (e && e.type === "mousedown" && e.button !== 0) return;
  isRingHolding = true;
  ringHoldStart = performance.now();
  if (ringBox) ringBox.classList.add("holding");

  function updateCharge() {
    if (!isRingHolding || isProposing) return;
    const elapsed = performance.now() - ringHoldStart;
    const progress = Math.min(1, elapsed / RING_HOLD_DURATION);
    const offset = 528 * (1 - progress);
    if (ringChargeBar) ringChargeBar.style.strokeDashoffset = offset;

    if (progress >= 1) {
      triggerEngagementProposal();
    } else {
      ringHoldTimer = requestAnimationFrame(updateCharge);
    }
  }
  ringHoldTimer = requestAnimationFrame(updateCharge);
}

function stopRingHold() {
  if (isProposing || !isRingHolding) return;
  isRingHolding = false;
  if (ringHoldTimer) {
    cancelAnimationFrame(ringHoldTimer);
    ringHoldTimer = null;
  }
  if (ringBox) ringBox.classList.remove("holding");
  if (ringChargeBar) {
    ringChargeBar.style.strokeDashoffset = "528";
  }
  if (currentScreen === 1 && !hasWornRing) {
    shakeRingPrompt();
  }
}

if (ringWrap) {
  ringWrap.addEventListener("mousedown", startRingHold);
  window.addEventListener("mouseup", stopRingHold);
  ringWrap.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      startRingHold(e);
    },
    { passive: false },
  );
  window.addEventListener("touchend", stopRingHold, { passive: true });
  window.addEventListener("touchcancel", stopRingHold, { passive: true });
  ringWrap.addEventListener("contextmenu", (e) => e.preventDefault());
  ringWrap.addEventListener("click", (e) => e.stopPropagation());
}

/* ──────────────────────────────────────────────
   3. TEMPTING RUNAWAY "NO" BUTTON
────────────────────────────────────────────── */
const noBtn = document.getElementById("btn-no");
const yesBtn = document.getElementById("btn-yes");
let dodgeCount = 0;
let lastTouchTime = 0;
let lastQuoteChangeTime = 0;
let lastDesktopMoveTime = 0;
let noBtnTarget = null;

const funnyQuotes =
  Array.isArray(GATE.noFunnyQuotes) && GATE.noFunnyQuotes.length
    ? GATE.noFunnyQuotes
    : [
        "No, i don't 🙈",
        "Hey, wait! 🏃‍♀️",
        "Can't touch this! 😜",
        "You can't say No! 💕",
        "Click 'Wanna See' please! 🥺",
        "Still trying? No chance! 😂",
        "Love is the only choice! 💍",
      ];

function resetNoButtonPosition() {
  dodgeCount = 0;
  noBtnTarget = null;
  lastQuoteChangeTime = 0;
  lastDesktopMoveTime = 0;
  noBtn.classList.remove("smooth-dodge", "dodged");
  noBtn.textContent = GATE.noButtonText || funnyQuotes[0];
  noBtn.style.position = "";
  noBtn.style.margin = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transform = "";
}

function getRectEdgeDistance(rect, px, py) {
  const dx = Math.max(rect.left - px, 0, px - rect.right);
  const dy = Math.max(rect.top - py, 0, py - rect.bottom);
  return Math.hypot(dx, dy);
}

function moveNoButton(pointerX, pointerY, smoothMode = false) {
  const now = performance.now();
  noBtn.classList.add("dodged");

  if (noBtn.style.position !== "fixed") {
    const startRect = noBtn.getBoundingClientRect();
    noBtn.classList.remove("smooth-dodge");
    noBtn.style.position = "fixed";
    noBtn.style.margin = "0";
    noBtn.style.left = `${startRect.left}px`;
    noBtn.style.top = `${startRect.top}px`;
    if (smoothMode) {
      void noBtn.offsetWidth;
    }
  }

  if (smoothMode) {
    if (now - lastQuoteChangeTime > 260) {
      dodgeCount++;
      noBtn.textContent = funnyQuotes[dodgeCount % funnyQuotes.length];
      lastQuoteChangeTime = now;
      playWhooshSound();
    }
    noBtn.classList.add("smooth-dodge");
  } else {
    dodgeCount++;
    noBtn.textContent = funnyQuotes[dodgeCount % funnyQuotes.length];
    playWhooshSound();
    noBtn.classList.remove("smooth-dodge");
  }

  const btnWidth = noBtn.offsetWidth || 140;
  const btnHeight = noBtn.offsetHeight || 48;
  const margin = 20;
  const minTop = 72;

  const maxW = Math.max(margin, window.innerWidth - btnWidth - margin);
  const maxH = Math.max(minTop, window.innerHeight - btnHeight - margin);

  const yesRect = yesBtn.getBoundingClientRect();
  let bestX = margin;
  let bestY = minTop;
  let bestScore = -Infinity;

  const hasPointer =
    typeof pointerX === "number" && typeof pointerY === "number";

  for (let i = 0; i < 30; i++) {
    const candX = margin + Math.random() * Math.max(0, maxW - margin);
    const candY = minTop + Math.random() * Math.max(0, maxH - minTop);

    const overlapsYes =
      candX < yesRect.right + 28 &&
      candX + btnWidth > yesRect.left - 28 &&
      candY < yesRect.bottom + 24 &&
      candY + btnHeight > yesRect.top - 24;

    if (overlapsYes && i < 25) continue;

    if (!hasPointer) {
      bestX = candX;
      bestY = candY;
      break;
    }

    const candCenterX = candX + btnWidth / 2;
    const candCenterY = candY + btnHeight / 2;
    const cursorDist = Math.hypot(
      candCenterX - pointerX,
      candCenterY - pointerY,
    );
    const score = cursorDist - (overlapsYes ? 1000 : 0);

    if (score > bestScore) {
      bestScore = score;
      bestX = candX;
      bestY = candY;
    }
    if (!overlapsYes && cursorDist > 260) {
      break;
    }
  }

  const randomRotate = (Math.random() - 0.5) * 18;
  noBtnTarget = {
    left: bestX,
    top: bestY,
    right: bestX + btnWidth,
    bottom: bestY + btnHeight,
  };
  lastDesktopMoveTime = now;

  noBtn.style.left = `${bestX}px`;
  noBtn.style.top = `${bestY}px`;
  noBtn.style.transform = `rotate(${randomRotate}deg) scale(0.96)`;
}

document.addEventListener("mousemove", (e) => {
  if (currentScreen !== 0) return;
  if (Date.now() - lastTouchTime < 700) return;

  const rect = noBtn.getBoundingClientRect();
  const edgeDist = getRectEdgeDistance(rect, e.clientX, e.clientY);
  const targetEdgeDist = noBtnTarget
    ? getRectEdgeDistance(noBtnTarget, e.clientX, e.clientY)
    : Infinity;

  const now = performance.now();
  const needsEscape =
    (edgeDist < 85 && !noBtnTarget) ||
    edgeDist < 38 ||
    targetEdgeDist < 100 ||
    (edgeDist < 85 && now - lastDesktopMoveTime > 360);

  if (needsEscape && now - lastDesktopMoveTime > 55) {
    moveNoButton(e.clientX, e.clientY, true);
  }
});

noBtn.addEventListener("mouseenter", (e) => {
  if (Date.now() - lastTouchTime < 700) return;
  moveNoButton(e.clientX, e.clientY, true);
});
noBtn.addEventListener("mouseover", (e) => {
  if (Date.now() - lastTouchTime < 700) return;
  moveNoButton(e.clientX, e.clientY, true);
});
noBtn.addEventListener(
  "touchstart",
  (e) => {
    lastTouchTime = Date.now();
    e.preventDefault();
    e.stopPropagation();
    moveNoButton(null, null, false);
  },
  { passive: false },
);

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (Date.now() - lastTouchTime < 700) {
    moveNoButton(null, null, false);
  } else {
    moveNoButton(e.clientX, e.clientY, true);
  }
  return false;
});

/* ──────────────────────────────────────────────
   4. INTERACTIVE SCRATCH CARD LOGIC
────────────────────────────────────────────── */
let scratchInitialized = false;
function initScratchCard() {
  if (scratchInitialized) return;
  scratchInitialized = true;

  const canvas = document.getElementById("scratch-canvas");
  const container = document.getElementById("scratch-box");
  const ctx = canvas.getContext("2d");

  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#f2bac9");
  grad.addColorStop(0.5, "#e58ea5");
  grad.addColorStop(1, "#dfb36b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "600 13px Montserrat";
  ctx.textAlign = "center";
  ctx.fillText(
    SCRATCH.coverLabel || "✨ SCRATCH HERE ✨",
    canvas.width / 2,
    canvas.height / 2 + 5,
  );

  let isDrawing = false;
  let isRevealed = false;

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    if (!isRevealed && Math.random() < 0.25) {
      checkScratchCompletion();
    }
  }

  function checkScratchCompletion() {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentCount = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) transparentCount++;
      }
      const totalSampled = imgData.data.length / 16;
      if (transparentCount / totalSampled > 0.45) {
        isRevealed = true;
        canvas.style.transition = "opacity 0.6s ease";
        canvas.style.opacity = "0";
        setTimeout(() => {
          canvas.style.display = "none";
        }, 600);
        playRomanticChime();
        triggerCelebration();
      }
    } catch (e) {}
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const p = getPos(e);
    scratch(p.x, p.y);
  });
  window.addEventListener("mouseup", () => {
    isDrawing = false;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      const p = getPos(e);
      scratch(p.x, p.y);
    }
  });

  canvas.addEventListener(
    "touchstart",
    (e) => {
      isDrawing = true;
      const p = getPos(e);
      scratch(p.x, p.y);
    },
    { passive: true },
  );
  window.addEventListener("touchend", () => {
    isDrawing = false;
  });
  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (isDrawing) {
        const p = getPos(e);
        scratch(p.x, p.y);
      }
    },
    { passive: true },
  );
}

/* ──────────────────────────────────────────────
   5. LOVE REASONS GENERATOR (SWEETALERT2)
────────────────────────────────────────────── */
const loveReasons =
  Array.isArray(LETTER.reasons) && LETTER.reasons.length
    ? LETTER.reasons
    : [
        "Your smile always turns my hardest days into warmth.",
        "The way your eyes light up when you're truly excited.",
        "How safe and peaceful my heart feels beside you.",
        "Simply because you are my soulmate forever.",
      ];
function popLoveReason(e) {
  if (e) e.stopPropagation();
  if (canMoveNextFromReasons) {
    nextScreen();
    return;
  }
  if (window.Swal && Swal.isVisible()) return;
  playRomanticChime();

  const currentIndex = reasonIdx % loveReasons.length;
  const text = loveReasons[currentIndex];
  reasonIdx++;
  const isAllViewed = reasonIdx >= loveReasons.length;
  const reasonPill = document.getElementById("reason-pill");

  const popupTitle = LETTER.reasonPopupTitle || "Why I Love You 💕";
  const popupTimer = Number(LETTER.reasonPopupDurationMs) || 3800;

  if (window.Swal) {
    Swal.fire({
      title: `<span style="font-family:'Great Vibes', cursive; font-size: 2.4rem; color: var(--rose-deep); display:block; margin-bottom: 2px;">${popupTitle}</span>`,
      html: `<div style="font-family:'Playfair Display', serif; font-style: italic; font-size: 1.18rem; color: var(--text-dark); line-height: 1.7; padding: 8px 12px;">"${text}"</div>`,
      showConfirmButton: false,
      timer: popupTimer,
      timerProgressBar: true,
      customClass: {
        popup: "romantic-swal-popup",
        timerProgressBar: "romantic-swal-timer",
      },
    }).then(() => {
      if (!reasonPill) return;
      if (isAllViewed) {
        canMoveNextFromReasons = true;
        reasonPill.classList.add("ready-next");
        const nextTxt =
          LETTER.reasonNextSlideText || "Now you can move next ✨";
        reasonPill.innerHTML = `<span>👉</span> ${nextTxt}`;
        updateNavControls();
      } else {
        const againTxt = LETTER.reasonTapAgainText || "Tap Again ✨";
        reasonPill.innerHTML = `<span>💌</span> ${againTxt}`;
      }
    });
  }
}

/* ──────────────────────────────────────────────
   6. 3D GYROSCOPE & MOUSE TILT PARALLAX EFFECT
────────────────────────────────────────────── */
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".screen.active .tilt-card");
  if (!cards.length) return;

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const rotX = ((e.clientY - cy) / cy) * -9;
  const rotY = ((e.clientX - cx) / cx) * 9;

  cards.forEach((card) => {
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
});

/* ──────────────────────────────────────────────
   7. FAIRY DUST / SPARKLE CURSOR TRAIL
────────────────────────────────────────────── */
const sCanvas = document.getElementById("sparkle-canvas");
const sCtx = sCanvas.getContext("2d");
let sW, sH;
function resizeSparkle() {
  sW = sCanvas.width = window.innerWidth;
  sH = sCanvas.height = window.innerHeight;
}
resizeSparkle();
window.addEventListener("resize", resizeSparkle);

const sparkles = [];
function addSparkle(x, y) {
  const colors = ["#dfb36b", "#f88fa9", "#fff", "#e55c82"];
  for (let i = 0; i < 2; i++) {
    sparkles.push({
      x: x + (Math.random() - 0.5) * 16,
      y: y + (Math.random() - 0.5) * 16,
      size: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.8,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}
window.addEventListener("mousemove", (e) => addSparkle(e.clientX, e.clientY));
window.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches && e.touches[0])
      addSparkle(e.touches[0].clientX, e.touches[0].clientY);
  },
  { passive: true },
);

function renderSparkles() {
  sCtx.clearRect(0, 0, sW, sH);
  for (let i = sparkles.length - 1; i >= 0; i--) {
    const s = sparkles[i];
    s.x += s.vx;
    s.y += s.vy;
    s.alpha -= 0.024;
    if (s.alpha <= 0) {
      sparkles.splice(i, 1);
      continue;
    }
    sCtx.save();
    sCtx.globalAlpha = s.alpha;
    sCtx.fillStyle = s.color;
    sCtx.beginPath();
    sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    sCtx.fill();
    sCtx.restore();
  }
  requestAnimationFrame(renderSparkles);
}
renderSparkles();

/* ──────────────────────────────────────────────
   8. PHOTO HANDLING (FIXED BY DEFAULT, OPTIONAL UPLOAD VIA CONFIG)
────────────────────────────────────────────── */
const PHOTO_STORAGE_KEY =
  "anniversary_card_photo_" +
  (COUPLE.coupleDisplay || "couple").toLowerCase().replace(/[^a-z0-9]/g, "_");

function triggerPhotoUpload() {
  if (!MEDIA.allowPhotoUpload) return;
  document.getElementById("photo-upload").click();
}

function loadSavedPhoto() {
  if (!MEDIA.allowPhotoUpload) return;
  try {
    const saved = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (saved) {
      const frame = document.getElementById("photo-frame");
      frame.innerHTML = `<img src="${saved}" alt="${MEDIA.photoAlt || "Couple Photo"}"/>`;
    }
  } catch (e) {}
}
loadSavedPhoto();

document.getElementById("photo-upload").addEventListener("change", function () {
  if (!MEDIA.allowPhotoUpload) return;
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    const frame = document.getElementById("photo-frame");
    frame.innerHTML = `<img src="${dataUrl}" alt="${MEDIA.photoAlt || "Couple Photo"}"/>`;
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, dataUrl);
    } catch (err) {}
    playRomanticChime();
  };
  reader.readAsDataURL(file);
});

/* ──────────────────────────────────────────────
   9. LIVE ANNIVERSARY COUNTER
────────────────────────────────────────────── */
const ANNIVERSARY_DATE = new Date(
  COUPLE.anniversaryStartISO || "2025-11-14T00:00:00",
);
function updateCounter() {
  const diff = Date.now() - ANNIVERSARY_DATE.getTime();
  const totalSec = Math.floor(Math.max(0, diff) / 1000);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600) % 24;
  const d = Math.floor(totalSec / 86400);

  document.getElementById("cnt-days").textContent = d;
  document.getElementById("cnt-hours").textContent = h
    .toString()
    .padStart(2, "0");
  document.getElementById("cnt-mins").textContent = m
    .toString()
    .padStart(2, "0");
  document.getElementById("cnt-secs").textContent = s
    .toString()
    .padStart(2, "0");
}
updateCounter();
setInterval(updateCounter, 1000);

/* ──────────────────────────────────────────────
   10. ROMANTIC BACKGROUND MUSIC (WITH AMBIENT FALLBACK)
────────────────────────────────────────────── */
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isMusicPlaying = false;
let bgMusicFailed = false;

if (bgMusic) {
  bgMusic.addEventListener("error", () => {
    bgMusicFailed = true;
  });
}

function playMusic() {
  if (!bgMusic || !bgMusic.getAttribute("src") || bgMusicFailed) {
    if (!isAmbientPlaying) toggleAmbientMusic();
    return;
  }
  bgMusic.volume =
    typeof MEDIA.musicVolume === "number" ? MEDIA.musicVolume : 0.7;
  bgMusic
    .play()
    .then(() => {
      isMusicPlaying = true;
      musicBtn.classList.remove("muted");
      musicBtn.innerHTML = "♫";
    })
    .catch(() => {
      if (!isAmbientPlaying) toggleAmbientMusic();
    });
}

function pauseMusic() {
  if (bgMusic) bgMusic.pause();
  isMusicPlaying = false;
  musicBtn.classList.add("muted");
  musicBtn.innerHTML = "♪";
  if (isAmbientPlaying) toggleAmbientMusic();
}

function toggleMusic() {
  if (isMusicPlaying || isAmbientPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMusic();
});

document.addEventListener(
  "click",
  () => {
    if (!isMusicPlaying && !isAmbientPlaying) {
      playMusic();
    }
  },
  { once: true },
);

/* ──────────────────────────────────────────────
   11. SOFT FLOATING PETALS & HEARTS
────────────────────────────────────────────── */
const petalSymbols = ["🌸", "🌺", "🌹", "💮", "✿", "❀"];
for (let i = 0; i < 20; i++) {
  const p = document.createElement("div");
  p.className = "petal";
  p.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  p.style.left = Math.random() * 100 + "vw";
  p.style.fontSize = 0.7 + Math.random() * 0.7 + "rem";
  p.style.animationDuration = 8 + Math.random() * 8 + "s";
  p.style.animationDelay = Math.random() * 10 + "s";
  document.body.appendChild(p);
}

const pCanvas = document.getElementById("particle-canvas");
const pCtx = pCanvas.getContext("2d");
let pW, pH;

function resizeCanvas() {
  pW = pCanvas.width = window.innerWidth;
  pH = pCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const heartPalette = ["#e55c82", "#f88fa9", "#dfb36b", "#f5b5c5", "#d64a70"];
class HeartParticle {
  constructor() {
    this.reset(true);
  }
  reset(init) {
    this.x = Math.random() * pW;
    this.y = init ? Math.random() * pH : pH + 20;
    this.size = 5 + Math.random() * 7;
    this.vy = -(0.3 + Math.random() * 0.7);
    this.vx = (Math.random() - 0.5) * 0.4;
    this.opacity = 0.2 + Math.random() * 0.4;
    this.color = heartPalette[Math.floor(Math.random() * heartPalette.length)];
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = 0.015 + Math.random() * 0.02;
  }
  update() {
    this.angle += this.angleSpeed;
    this.x += Math.sin(this.angle) * 0.5 + this.vx;
    this.y += this.vy;
    if (this.y < -30) this.reset(false);
  }
  draw() {
    pCtx.save();
    pCtx.globalAlpha = this.opacity;
    pCtx.font = `${this.size * 2.2}px serif`;
    pCtx.fillStyle = this.color;
    pCtx.textAlign = "center";
    pCtx.fillText("♥", this.x, this.y);
    pCtx.restore();
  }
}

const particles = [];
for (let i = 0; i < 35; i++) particles.push(new HeartParticle());

function renderParticles() {
  pCtx.clearRect(0, 0, pW, pH);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(renderParticles);
}
renderParticles();

/* ──────────────────────────────────────────────
   12. CELEBRATION FIREWORKS / CONFETTI & SHARE
────────────────────────────────────────────── */
const fCanvas = document.getElementById("firework-canvas");
const fCtx = fCanvas.getContext("2d");
let fireworks = [];
let fireworkActive = false;

class ConfettiPiece {
  constructor() {
    this.x = Math.random() * pW;
    this.y = Math.random() * (pH * 0.45);
    this.particles = [];
    const count = 45;
    const baseHue = Math.random() * 360;
    for (let i = 0; i < count; i++) {
      const angle = ((2 * Math.PI) / count) * i;
      const speed = 1.2 + Math.random() * 4.5;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: `hsl(${baseHue + (i % 3) * 20}, 85%, 65%)`,
      });
    }
  }
  update() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.vx *= 0.98;
      p.alpha -= 0.014;
    });
    this.particles = this.particles.filter((p) => p.alpha > 0);
  }
  draw() {
    this.particles.forEach((p) => {
      fCtx.save();
      fCtx.globalAlpha = p.alpha;
      fCtx.fillStyle = p.color;
      fCtx.beginPath();
      fCtx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      fCtx.fill();
      fCtx.restore();
    });
  }
  get isDone() {
    return this.particles.length === 0;
  }
}

function triggerCelebration() {
  fCanvas.width = pW;
  fCanvas.height = pH;
  fCanvas.style.display = "block";
  fireworkActive = true;
  fireworks = [];

  let waves = 0;
  const interval = setInterval(() => {
    fireworks.push(new ConfettiPiece());
    waves++;
    if (waves >= 8) clearInterval(interval);
  }, 350);

  function loopCelebration() {
    fCtx.clearRect(0, 0, pW, pH);
    fireworks.forEach((f) => {
      f.update();
      f.draw();
    });
    fireworks = fireworks.filter((f) => !f.isDone);
    if (fireworkActive) requestAnimationFrame(loopCelebration);
    else {
      fCtx.clearRect(0, 0, pW, pH);
      fCanvas.style.display = "none";
    }
  }
  loopCelebration();
  setTimeout(() => {
    fireworkActive = false;
  }, 5500);
}

function shareAnniversary() {
  const title = FINALE.shareTitle || "Happy Anniversary 💕";
  const text = FINALE.shareText || "Celebrating eternal love! 💍";
  const copiedMsg =
    FINALE.copiedMessage || "Link copied to clipboard! Share with love 💕";

  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url: window.location.href,
      })
      .catch(() => {});
  } else {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert(copiedMsg);
      })
      .catch(() => {});
  }
}
