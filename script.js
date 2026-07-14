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
    "card.meta": "Category · Year",
    "card.title": "Project title placeholder",
    "card.desc":
      "One or two lines describing the project, the problem, and your role. Lorem ipsum dolor sit amet consectetur.",
    "card.link": "View project →",

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
    "card.meta": "類別 · 年份",
    "card.title": "專案標題（佔位）",
    "card.desc":
      "一到兩行描述這個專案、要解決的問題，以及你的角色。",
    "card.link": "查看專案 →",

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

function resolveInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("zh")) return "zh-Hant";
  return "en";
}

function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) lang = "en";
  const dict = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });

  document.documentElement.lang = lang;
  document.documentElement.setAttribute("data-lang", lang);
  document.title = dict["meta.title"];

  langButtons.forEach((btn) => {
    const active = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

langButtons.forEach((btn) =>
  btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")))
);

setLanguage(resolveInitialLang());

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
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
