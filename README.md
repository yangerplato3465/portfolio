# Portfolio

## Files

| File          | Purpose                                             |
| ------------- | --------------------------------------------------- |
| `index.html`  | Page structure and content (all placeholder for now)|
| `styles.css`  | Design system — colors, type, layout, components    |
| `script.js`   | Small interactions (nav, scroll reveal, footer year)|

## Preview

Open the file directly, or run a local server for a cleaner experience:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What to customize

- **Text**: everything wrapped in `[brackets]` or filled with "placeholder /
  lorem ipsum" is meant to be replaced.
- **Sections**: About, Selected work, Experience, Contact. Add/remove `.card`
  blocks in the Work grid and `.timeline__item` blocks in Experience as needed.
- **Colors**: edit the CSS custom properties at the top of `styles.css`
  (`:root`). The single accent color is `--accent`.
- **Type**: `--font-display` (Fraunces serif) and `--font-text` (Inter).
- **Images**: project cards use a placeholder `.card__media` box — drop in an
  `<img>` when you have real assets.

## Sections included

1. Sticky header + responsive nav
2. Hero
3. About (bio + skills)
4. Selected work (project grid)
5. Experience (timeline)
6. Contact + social links
7. Footer
