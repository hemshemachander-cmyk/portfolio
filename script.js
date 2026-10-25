/* Cyberpunk HUD portfolio interactions.
   Customize contact links and project URLs in PORTFOLIO_CONFIG below.
   Keep unknown personal details as placeholders until verified. */
"use strict";

const PORTFOLIO_CONFIG = {
  email: "hemshemachander@gmail.com", // Portfolio contact email
  githubUrl: "https://github.com/hemshemachander-cmyk/portfolio",
  linkedinUrl: "https://www.linkedin.com/in/hemachander-hems-30725a358",
  projectRepositoryUrl: "",  // Smart Campus Assistant repository URL
  projectDemoUrl: ""         // Smart Campus Assistant live demo URL
};

const startScreen = document.getElementById("startScreen");
const siteShell = document.getElementById("siteShell");
const startButton = document.getElementById("startButton");
const returnStart = document.getElementById("returnStart");
const menuToggle = document.getElementById("menuToggle");
const topNav = document.getElementById("topNav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const travelLoader = document.getElementById("travelLoader");
let loaderTimer = null;
function enterPortfolio() {
  if (!startScreen || !siteShell || startScreen.classList.contains("is-leaving")) return;
  if (travelLoader) {
    travelLoader.hidden = false;
    travelLoader.classList.remove("loader-exit");
    travelLoader.setAttribute("aria-hidden", "false");
  }
  startButton?.setAttribute("disabled", "disabled");
  const progress = document.getElementById("loaderProgress");
  const percent = document.getElementById("loaderPercent");
  const status = document.getElementById("loaderStatus");
  const heading = document.getElementById("loaderHeading");
  const kicker = document.getElementById("loaderKicker");
  const description = document.getElementById("loaderDescription");
  const phases = [
    { at: 0, status: "SPINNING UP PLANETARY SCAN", heading: "SCANNING THE <span>WORLD</span>", kicker: "GLOBAL PLAYER NETWORK", description: "Mapping the globe and locating the India node..." },
    { at: 25, status: "COMPARING PLAYER NODES", heading: "RANKING <span>PLAYER IDS</span>", kicker: "LEADERBOARD SYNCHRONIZED", description: "Low-tier profiles detected. Searching for the legendary player..." },
    { at: 48, status: "LEGENDARY SIGNATURE FOUND", heading: "PLAYER <span>HMK-01</span> DETECTED", kicker: "S+ // LEGENDARY STATUS", description: "Top-ranked profile confirmed. Skill signature unmatched." },
    { at: 72, status: "LOCKING INDIA DESTINATION", heading: "TARGET <span>INDIA</span>", kicker: "DESTINATION LOCKED", description: "Connecting the HMK-01 profile to its home node..." },
    { at: 91, status: "ENTERING PLAYER WORLD", heading: "WELCOME, <span>LEGEND</span>", kicker: "ACCESS GRANTED // #001", description: "Opening your developer world..." }
  ];
  const duration = prefersReducedMotion.matches ? 800 : 8200;
  const start = performance.now();
  function tick(now) {
    const raw = Math.min(100, ((now - start) / duration) * 100);
    const eased = 100 * (1 - Math.pow(1 - raw / 100, 1.65));
    if (progress) progress.style.width = `${eased}%`;
    if (percent) percent.textContent = `${Math.round(eased).toString().padStart(2, "0")}%`;
    const phase = [...phases].reverse().find((item) => raw >= item.at) || phases[0];
    if (status && status.dataset.phase !== String(phase.at)) {
      status.dataset.phase = String(phase.at);
      status.textContent = phase.status;
      if (heading) heading.innerHTML = phase.heading;
      if (kicker) kicker.textContent = phase.kicker;
      if (description) description.textContent = phase.description;
      document.querySelectorAll(".game-id").forEach((node) => node.classList.toggle("is-targeted", node.dataset.node === "HMK-01" && raw >= 48));
    }
    if (raw < 100) loaderTimer = requestAnimationFrame(tick);
    else {
      if (travelLoader) travelLoader.classList.add("loader-exit");
      window.setTimeout(() => {
        if (travelLoader) { travelLoader.hidden = true; travelLoader.setAttribute("aria-hidden", "true"); }
        siteShell.inert = false;
        siteShell.classList.add("is-visible");
        startScreen.classList.add("is-leaving");
        document.body.classList.add("portfolio-started");
        window.setTimeout(() => { startScreen.hidden = true; startButton?.removeAttribute("disabled"); document.getElementById("main")?.focus({ preventScroll: true }); }, prefersReducedMotion.matches ? 20 : 700);
        revealVisibleElements();
      }, prefersReducedMotion.matches ? 0 : 500);
    }
  }
  loaderTimer = requestAnimationFrame(tick);
}
function returnToStartScreen() {
  if (!startScreen || !siteShell) return;
  startScreen.hidden = false;
  startScreen.classList.remove("is-leaving");
  siteShell.classList.remove("is-visible");
  siteShell.inert = true;
  document.body.classList.remove("portfolio-started");
  closeMenu();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  startButton?.focus({ preventScroll: true });
}
startButton?.addEventListener("click", enterPortfolio);
returnStart?.addEventListener("click", returnToStartScreen);
document.addEventListener("keydown", (event) => {
  if (!startScreen.hidden && (event.key === "Enter" || event.key === " ")) {
    if (event.target === startScreen || event.target === document.body) {
      event.preventDefault();
      enterPortfolio();
    }
  }
});

function closeMenu() {
  topNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}
menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  topNav?.classList.toggle("is-open", !expanded);
});
document.querySelectorAll(".topnav a, .rail-nav a, .scroll-cue, .brand, .footer a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

const sectionIds = ["home", "about", "skills", "projects", "education", "contact"];
const navLinks = [...document.querySelectorAll(".topnav a")];
const railLinks = [...document.querySelectorAll(".rail-link")];
function setActiveSection(id) {
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  railLinks.forEach((link) => {
    const active = link.dataset.section === id;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveSection(visible.target.id);
  }, { rootMargin: "-22% 0px -55% 0px", threshold: [0, .15, .35, .6] });
  document.querySelectorAll("[data-observe]").forEach((section) => sectionObserver.observe(section));
} else {
  window.addEventListener("scroll", () => {
    let current = "home";
    document.querySelectorAll("[data-observe]").forEach((section) => {
      if (section.getBoundingClientRect().top < window.innerHeight * .4) current = section.id;
    });
    setActiveSection(current);
  }, { passive: true });
}

let revealObserver;
function revealVisibleElements() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-in"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
  }
  items.forEach((item) => {
    if (!item.classList.contains("is-in")) revealObserver.observe(item);
  });
}
if (prefersReducedMotion.matches) {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-in"));
} else {
  revealVisibleElements();
}

document.querySelectorAll("[data-project-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const willOpen = button.getAttribute("aria-expanded") !== "true";
    const extraId = button.getAttribute("aria-controls");
    const extra = extraId ? document.getElementById(extraId) : null;
    button.setAttribute("aria-expanded", String(willOpen));
    const marker = button.querySelector("span");
    if (marker) marker.textContent = willOpen ? "−" : "＋";
    if (button.childNodes[0]) button.childNodes[0].textContent = willOpen ? "HIDE PROJECT DETAILS " : "VIEW PROJECT DETAILS ";
    if (extra) extra.hidden = !willOpen;
  });
});

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && Boolean(url.hostname);
  } catch {
    return false;
  }
}
function setConfiguredContact(id, value, label) {
  const element = document.getElementById(id);
  if (!element) return;
  if (value && (label === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : isValidHttpUrl(value))) {
    element.textContent = value;
    const link = document.createElement("a");
    link.textContent = value;
    link.href = label === "email" ? `mailto:${value}` : value;
    if (label !== "email") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    element.replaceChildren(link);
    element.closest(".contact-channel")?.querySelector(".channel-state")?.replaceChildren(document.createTextNode("CONFIGURED"));
  }
}
setConfiguredContact("emailDisplay", PORTFOLIO_CONFIG.email, "email");
setConfiguredContact("githubDisplay", PORTFOLIO_CONFIG.githubUrl, "url");
setConfiguredContact("linkedinDisplay", PORTFOLIO_CONFIG.linkedinUrl, "url");


const clock = document.getElementById("clock");
function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}
updateClock();
window.setInterval(updateClock, 60000);

// Subtle pointer-driven 3D tilt for the abstract hero core and project cards.
// It is decorative only, disabled for touch-first devices and reduced-motion users.
if (!prefersReducedMotion.matches && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".visual-frame, .project-card, .skill-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (card.classList.contains("visual-frame")) {
        card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
      } else if (card.classList.contains("project-card")) {
        card.style.transform = `perspective(1000px) rotateX(${(-y * 1.5).toFixed(2)}deg) rotateY(${(x * 1.5).toFixed(2)}deg) translateY(-2px)`;
      } else {
        card.style.transform = `perspective(700px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateY(-3px)`;
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      
    });
  });
}


// Retro arcade-style UI cues, synthesized with Web Audio (not copied from GTA audio).
// The same short navigation cue is used for menu links and scrolling.
let gameAudio = null;
function playGameCue(kind = "menu") {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    gameAudio ||= new AudioCtx();
    if (gameAudio.state === "suspended") gameAudio.resume();
    const now = gameAudio.currentTime;
    const isConfirm = kind === "confirm";
    const master = gameAudio.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(isConfirm ? 0.065 : 0.052, now + 0.008);
    master.gain.exponentialRampToValueAtTime(0.0001, now + (isConfirm ? 0.62 : 0.19));
    const filter = gameAudio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isConfirm ? 1900 : 1750, now);
    filter.frequency.exponentialRampToValueAtTime(isConfirm ? 520 : 780, now + (isConfirm ? 0.5 : 0.15));
    filter.connect(master);
    master.connect(gameAudio.destination);

    // Short, slightly descending digital blip for navigation; ascending cue for START.
    const notes = isConfirm ? [[392, 0], [523.25, 0.08], [659.25, 0.17], [783.99, 0.27]] : [[660, 0], [880, 0.025]];
    notes.forEach(([freq, delay], index) => {
      const osc = gameAudio.createOscillator();
      const voice = gameAudio.createGain();
      osc.type = isConfirm ? "sine" : (index === 0 ? "triangle" : "sine");
      osc.frequency.setValueAtTime(freq, now + delay);
      if (!isConfirm) {
        osc.frequency.exponentialRampToValueAtTime(freq * (index === 0 ? 0.72 : 0.78), now + delay + 0.11);
      }
      voice.gain.setValueAtTime(0.0001, now + delay);
      voice.gain.exponentialRampToValueAtTime(isConfirm ? (index === 0 ? 0.48 : 0.3) : (index === 0 ? 0.52 : 0.22), now + delay + 0.008);
      voice.gain.exponentialRampToValueAtTime(0.0001, now + delay + (isConfirm ? 0.28 : 0.12));
      osc.connect(voice);
      voice.connect(filter);
      osc.start(now + delay);
      osc.stop(now + delay + (isConfirm ? 0.31 : 0.14));
    });
    if (isConfirm) {
      const bass = gameAudio.createOscillator();
      const bassGain = gameAudio.createGain();
      bass.type = "triangle";
      bass.frequency.setValueAtTime(82.4, now);
      bass.frequency.exponentialRampToValueAtTime(41.2, now + 0.48);
      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);
      bass.connect(bassGain);
      bassGain.connect(gameAudio.destination);
      bass.start(now);
      bass.stop(now + 0.54);
    }
  } catch (_) { /* Sound is an optional enhancement. */ }
}
startButton?.addEventListener("click", () => playGameCue("confirm"), { once: true });
let lastScrollCue = 0;
window.addEventListener("scroll", () => {
  if (document.body.classList.contains("portfolio-started") && window.scrollY > 20 && Date.now() - lastScrollCue > 650) {
    lastScrollCue = Date.now(); playGameCue("menu");
  }
}, { passive: true });
document.querySelectorAll(".topnav a, .rail-nav a, .hero-actions a, .brand").forEach((link) => {
  link.addEventListener("mouseenter", () => playGameCue("menu"));
  link.addEventListener("focus", () => playGameCue("menu"));
});
