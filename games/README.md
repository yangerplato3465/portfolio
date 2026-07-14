# Games

Self-hosted playable game builds. Each game lives in its own folder and is embedded
on the site through an itch.io-style modal (a **Play** button opens it in an overlay).

```
games/
  <slug>/            ← one folder per game = the Godot Web export output
    index.html       ← entry file (Godot names everything index.*)
    index.js  index.wasm  index.pck  ...
```

## Adding a game (Godot HTML5)

1. In Godot: **Project → Export…** and add a **Web** preset (install export templates if asked).
2. Set the **Export Path** to `games/<slug>/index.html` — the entry file must be `index.html`.
3. **Recommended:** turn **off** *Thread Support* in the Web preset.
   - Godot's threaded builds need `SharedArrayBuffer`, which requires special
     `COOP`/`COEP` server headers that static hosts (GitHub Pages, `python3 -m http.server`)
     don't send. A thread-less export avoids all of that and just works. Fine for 2D games.
4. Click **Export Project** (not "Export PCK/Zip"). Commit the whole `games/<slug>/` folder.
5. Register the game in `../script.js` — add an entry to the `games` array:

   ```js
   {
     slug: "my-game",
     path: "games/my-game/index.html",
     cover: "assets/covers/my-game.jpg", // optional; omit for a placeholder
     aspect: "16 / 9",                     // "9 / 16" for a portrait/slot game
     title: { en: "My Game", "zh-Hant": "我的遊戲" },
     meta:  { en: "Godot · 2025", "zh-Hant": "Godot · 2025" },
     desc:  { en: "One-line pitch.", "zh-Hant": "一句話介紹。" },
   }
   ```

6. Cover art (optional): drop an image at `assets/covers/<slug>.jpg` (~16:10 looks best).

## Threaded builds — already handled here

This repo **already ships** `coi-serviceworker.js` at the root (loaded first in
`../index.html`), so threaded Godot exports work on GitHub Pages and on local
`python3 -m http.server`. `Alchetris` is a threaded build and relies on it.

- The shim registers a service worker that injects `COOP`/`COEP` on every same-origin
  response (including the iframed game), enabling `SharedArrayBuffer` over HTTPS / localhost.
- On first visit the page reloads itself once to activate the worker — this is normal.
- The Google Fonts `<link>`s carry `crossorigin` so they still load under isolation.
- Nothing extra is needed per game; just drop the export in and add a config entry.
- (Thread-less exports remain the simplest option and are unaffected by any of this.)
