// ============================================================
// Portfolio — base interactions + i18n (English / 繁體中文)
// Dependency-free; translations inline so it works from file://.
// ============================================================

// ---------- Translations ----------
// Keys map to elements via the data-i18n attribute in index.html.
const translations = {
  en: {
    "meta.title": "Patrick Yang — Portfolio",
    "a11y.skip": "Skip to content",

    "nav.about": "About",
    "nav.work": "Work",
    "nav.experience": "Experience",
    "nav.contact": "Contact",

    "hero.title": "I'm a frontend engineer",
    "hero.lead":
      "",
    "hero.viewWork": "View work",
    "hero.getInTouch": "Get in touch",

    "about.title": "About",
    "about.p1":
      "A passionate game developer with solid programming logic and foundational understanding, skilled in using Godot and PixiJS to build engaging experiences. Adaptable and fast-learning, I quickly master new tools and frameworks.",
    "about.p2":
      "By leveraging AI tools, I streamline workflows, respond rapidly to tasks, and consistently deliver efficient, high-quality solutions. Experienced in developing, releasing, and maintaining mobile applications across both iOS and Android platforms.",
    "skill.1": "TypeScript",
    "skill.2": "JavaScript",
    "skill.3": "Cursor",
    "skill.4": "Claude Code",
    "skill.5": "Godot",
    "skill.6": "Unity",

    "work.title": "Selected work",
    "work.empty": "Games coming soon.",
    "play": "▶ Play",
    "modal.fullscreen": "Fullscreen",
    "modal.close": "Close",

    "exp.title": "Experience",
    "exp.period1": "2025 — Present",
    "exp.role1": "Frontend Developer",
    "exp.org1": "CC Tech",
    "exp.desc1":
      "Develope and maintain over 10 slot games",
    "exp.period2": "2021 — 2025",
    "exp.role2": "Frontend Developer",
    "exp.org2": "Bang Bang Games",
    "exp.desc2":
      "Develope and maintain over 10 slot games",
    "exp.period3": "2019 — 2021",
    "exp.role3": "Frontend Developer",
    "exp.org3": "Riversense Games",
    "exp.desc3":
      "Develope and maintain mahjong games, lottery websites, slot games etc.",

    "contact.title": "Contact me",
  },

  "zh-Hant": {
    "meta.title": "楊宗翰 — 作品集",
    "a11y.skip": "跳至內容",

    "nav.about": "關於",
    "nav.work": "作品",
    "nav.experience": "經歷",
    "nav.contact": "聯絡",

    "hero.title": "我是一名前端工程師",
    "hero.lead":
      "獨立遊戲開發者，遊戲設計，網頁前端工程師",
    "hero.viewWork": "查看作品",
    "hero.getInTouch": "與我聯絡",

    "about.title": "關於",
    "about.p1":
      "擁有良好的程式思維與基礎理解力，能流暢地與技術團隊溝通並靈活運用 AI 工具增加工作效率。對交辦任務反應迅速、執行力極佳，致力於用高效的方式解決問題",
    "about.p2":
      "對遊戲開發有熱情，擅長使用Godot，PIXIjs等等開發遊戲，對於全新陌生的開發工具和框架都能快速上手。擁有手機雙平台開發上架及維護經驗。",
    "skill.1": "TypeScript",
    "skill.2": "JavaScript",
    "skill.3": "Cursor",
    "skill.4": "Claude Code",
    "skill.5": "Godot",
    "skill.6": "Unity",

    "work.title": "精選作品",
    "work.empty": "遊戲即將推出。",
    "play": "▶ 遊玩",
    "modal.fullscreen": "全螢幕",
    "modal.close": "關閉",

    "exp.title": "經歷",
    "exp.period1": "2025 — 至今",
    "exp.role1": "前端主任工程師",
    "exp.org1": "長青資訊",
    "exp.desc1": "遊戲前端開發，製作過超過10款遊戲",
    "exp.period2": "2021 — 2025",
    "exp.role2": "遊戲前端工程師",
    "exp.org2": "Bang Bang Games",
    "exp.desc2": "遊戲前端開發，製作過超過10款遊戲",
    "exp.period3": "2019 — 2021",
    "exp.role3": "遊戲前端工程師",
    "exp.org3": "遊戲河流",
    "exp.desc3": "遊戲前端開發，製作過麻將遊戲，彩票網站，拉霸遊戲等等",

    "contact.title": "聯絡我",
  },
};

// ---------- Language switching ----------
const SUPPORTED = ["en", "zh-Hant"];
const STORAGE_KEY = "portfolio-lang";
const langButtons = document.querySelectorAll(".lang-switch__btn");
let currentLang = "en";

function resolveInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("zh")) return "zh-Hant";
  return "en";
}

function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) lang = "en";
  currentLang = lang;
  const dict = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });

  // Buttons that translate their title/aria-label rather than text.
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] != null) {
      el.title = dict[key];
      el.setAttribute("aria-label", dict[key]);
    }
  });

  document.documentElement.lang = lang;
  document.documentElement.setAttribute("data-lang", lang);
  document.title = dict["meta.title"];

  langButtons.forEach((btn) => {
    const active = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  // Dynamic game cards + any open modal follow the language too.
  updateGameCards(lang);
  updateOpenModalTitle();

  localStorage.setItem(STORAGE_KEY, lang);
}

langButtons.forEach((btn) =>
  btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")))
);

// ---------- Current year in footer ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Header border once scrolled ----------
const header = document.querySelector(".site-header");
const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- Mobile nav toggle ----------
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// ---------- Reveal elements on scroll ----------
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

// Observe a set of `.reveal` elements (used for static markup and dynamic cards).
function observeReveals(els) {
  els.forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("is-visible");
  });
}

observeReveals(document.querySelectorAll(".reveal"));

// ============================================================
// Games — self-hosted Godot HTML5 builds, itch.io-style modal
// ============================================================

// Add one entry per game. Drop the Godot Web export in games/<slug>/
// (entry file games/<slug>/index.html). `cover` is optional — without it
// the card shows a gradient placeholder. `aspect` matches the game's
// resolution, e.g. "16 / 9" (landscape) or "9 / 16" (portrait slot game).
const games = [
  {
    slug: "alchetris",
    path: "games/Alchetris/index.html",
    cover: "assets/covers/alchetris.png",
    aspect: "16 / 9",
    title: { en: "Alchetris", "zh-Hant": "Alchetris" },
    meta: { en: "Godot", "zh-Hant": "Godot" },
    desc: {
      en: "A roguelike game based on Tetris, eliminate blocks to attack enemies and collect powerful weapons to defeat them.",
      "zh-Hant": "以俄羅斯方塊為基礎的roguelike遊戲，消除方塊來攻擊敵人，搜集強大的裝備來擊敗敵人",
    },
  },
  {
    slug: "dreamtogether",
    path: "games/DreamTogether/index.html",
    cover: "assets/covers/dreamtogether.png",
    aspect: "16 / 9",
    heightVh: 88, // bigger than the default 80 — this build reads as small otherwise
    maxWidth: "600px",
    title: { en: "Dream Together", "zh-Hant": "Dream Together" },
    meta: { en: "Godot", "zh-Hant": "Godot" },
    desc: {
      en: "A short and chill puzzle game.",
      "zh-Hant": "一個簡短有趣的益智小遊戲",
    },
  },
  {
    slug: "horrorbuild",
    path: "games/horrorbuild/index.html",
    cover: "assets/covers/horrorbuild.png",
    aspect: "16 / 9",
    title: { en: "Horrorbuild", "zh-Hant": "Horrorbuild" },
    meta: { en: "Godot", "zh-Hant": "Godot" },
    desc: {
      en: "A 3D horror first person survival game.",
      "zh-Hant": "3D 恐怖生存小遊戲，蒐集所有物品並躲避怪物。",
    },
  },
  {
    slug: "hunters-legacy",
    path: "games/hunters-legacy/index.html",
    cover: "assets/covers/hunterslegacy.png",
    aspect: "16 / 9",
    title: { en: "Hunter's Legacy", "zh-Hant": "Hunter's Legacy" },
    meta: { en: "Godot", "zh-Hant": "Godot" },
    desc: {
      en: "A thrilling 2D top-down shooter roguelike game.",
      "zh-Hant": "驚險刺激的2D射擊Roguelike遊戲。",
    },
  },
];

const workGrid = document.getElementById("work-grid");
const workEmpty = document.getElementById("work-empty");

// Pick the string for the active language, falling back to English.
function pick(field) {
  if (!field) return "";
  return field[currentLang] || field.en || "";
}

function renderGames() {
  if (!workGrid) return;
  workGrid.innerHTML = "";

  if (!games.length) {
    if (workEmpty) workEmpty.hidden = false;
    return;
  }
  if (workEmpty) workEmpty.hidden = true;

  const frag = document.createDocumentFragment();
  games.forEach((game) => {
    const card = document.createElement("article");
    card.className = "card card--game reveal";
    card.dataset.slug = game.slug;

    const media = document.createElement("div");
    media.className = "card__media";
    media.setAttribute("aria-hidden", "true");
    if (game.cover) {
      const img = document.createElement("img");
      img.src = game.cover;
      img.alt = "";
      img.loading = "lazy";
      // If the cover is missing, drop it so the gradient placeholder shows.
      img.addEventListener("error", () => img.remove());
      media.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "card__body";

    const meta = document.createElement("p");
    meta.className = "card__meta";
    meta.dataset.field = "meta";

    const title = document.createElement("h3");
    title.className = "card__title";
    title.dataset.field = "title";

    const desc = document.createElement("p");
    desc.className = "card__desc";
    desc.dataset.field = "desc";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn--primary play-btn";
    btn.dataset.slug = game.slug;

    body.append(meta, title, desc, btn);
    card.append(media, body);
    frag.appendChild(card);
  });

  workGrid.appendChild(frag);
  updateGameCards(currentLang);
  observeReveals(workGrid.querySelectorAll(".reveal"));
}

// Refresh the text on rendered game cards for the given language.
function updateGameCards(lang) {
  if (!workGrid) return;
  const dict = translations[lang] || translations.en;
  workGrid.querySelectorAll(".card--game").forEach((card) => {
    const game = games.find((g) => g.slug === card.dataset.slug);
    if (!game) return;
    card.querySelector('[data-field="meta"]').textContent = pick(game.meta);
    card.querySelector('[data-field="title"]').textContent = pick(game.title);
    card.querySelector('[data-field="desc"]').textContent = pick(game.desc);
    card.querySelector(".play-btn").textContent = dict["play"];
  });
}

// ---------- Game modal ----------
const modal = document.getElementById("game-modal");
const modalFrame = modal && modal.querySelector(".game-modal__frame");
const modalTitle = document.getElementById("game-modal-title");
const gameIframe = document.getElementById("game-iframe");
let openSlug = null;
let closeTimer = null;

function openGame(slug) {
  const game = games.find((g) => g.slug === slug);
  if (!game || !modal) return;
  clearTimeout(closeTimer);
  openSlug = slug;

  modalFrame.style.setProperty("--game-aspect", game.aspect || "16 / 9");
  // Optional per-game size overrides (see the games config).
  modalFrame.style.setProperty("--game-vh", (game.heightVh || 80) + "vh");
  modalFrame.style.setProperty("--game-maxw", game.maxWidth || "1180px");
  modalTitle.textContent = pick(game.title);
  gameIframe.title = pick(game.title);
  gameIframe.src = game.path;

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  // Next frame so the transition runs from the hidden state.
  requestAnimationFrame(() => modal.classList.add("is-open"));

  const closeBtn = document.getElementById("game-close");
  if (closeBtn) closeBtn.focus();
}

function closeGame() {
  if (!modal || modal.hidden) return;
  openSlug = null;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  // After the fade-out, hide and clear the src to stop audio/CPU.
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    modal.hidden = true;
    gameIframe.removeAttribute("src");
  }, 220);
}

function updateOpenModalTitle() {
  if (!openSlug || !modalTitle) return;
  const game = games.find((g) => g.slug === openSlug);
  if (game) {
    modalTitle.textContent = pick(game.title);
    gameIframe.title = pick(game.title);
  }
}

if (workGrid) {
  workGrid.addEventListener("click", (e) => {
    // Play button or the cover art both launch the game.
    const trigger = e.target.closest(".play-btn, .card--game .card__media");
    if (!trigger) return;
    const card = trigger.closest(".card--game");
    if (card) openGame(card.dataset.slug);
  });
}

if (modal) {
  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeGame)
  );
  const fsBtn = document.getElementById("game-fullscreen");
  if (fsBtn)
    fsBtn.addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (modalFrame.requestFullscreen) modalFrame.requestFullscreen();
    });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeGame();
  });
}

// ---------- Boot ----------
renderGames();
setLanguage(resolveInitialLang());
