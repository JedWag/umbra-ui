# UI terms

- **Sidebar** — the nav panel on the side of the screen.
- **Topbar** — the strip across the top of the screen.
- **Canvas** — the plain background behind everything, showing through around/behind the cards.
- **Card** — a bounded content box sitting on top of the canvas (a table, a tile, a form section).


## Typography

- **Font: Outfit** (`--font-outfit`). Confirmed straight from the reference site's own CSS — `body{...--text-family:var(--font-outfit),sans-serif...}` is an unconditional rule, not scoped behind any `[data-theme-preset=...]`/`[data-theme-font=...]` selector, so it's the real default regardless of which color theme preset is active. (An earlier session installed Geist Variable instead by mistake — since corrected.)
  - Exact stack, pulled from the reference's own generated CSS (`.outfit_ebb4a886-module__l2bVbG__className{font-family:Outfit,Outfit Fallback}`): `--font-sans: Outfit, "Outfit Fallback", sans-serif`. "Outfit Fallback" is Next.js's auto-generated metric-matched local fallback (`local(Arial)` with `ascent-override: 100.18%; descent-override: 26.05%; line-gap-override: 0.0%; size-adjust: 99.82%`), replicated in `index.css` so unloaded-font layout shift matches too.
  - Loaded via `@fontsource/outfit` (static weights 400/500/600 — matching the only font-weight utilities actually used: `font-normal`/`font-medium`/`font-semibold`), not the variable-font package — the reference's own `font-family` is literally `Outfit`, not `Outfit Variable`.

## Palette


`lab(L a b)` and hex codes are both just direct CSS colors — paste as-is. `L` is lightness, `a`/`b` are color axes.

### Structure (canvas / sidebar / card / topbar)

| Term | Color | Value | Notes|
|------|-------|-------|---|
| canvas | background | `lab(4.3721% 0.31183 -1.13819)` | not a token — `--background` with `--muted` composited over it at 40% opacity via a `bg-muted/40` wrapper on the main content area (see `App.tsx`) |
| card | background | `lab(2.51549% .19104 -.702733)` |  |
| sidebar | background | `lab(8.31261% .542074 -1.9154)` | |
| topbar | background | `lab(2.51549% .19104 -.702733)` | not its own token — reuses card background |
| all of the above | border | `lab(15.7118% .831872 -2.88485)` | one shared border color used everywhere (card edge, sidebar edge, topbar edge, table row dividers) |

### Text

| Role | Value |
|------|-------|
| primary text (headings, body) | `lab(90.6739% .53075 -1.9261)` |
| muted/secondary text (labels, meta) | `lab(65.6739% 1.21629 -4.34661)` |

### Accent / primary button

| Role | Value |
|------|-------|
| button fill  | `lab(98.2487% .13262 -.472021)`|
| text on that button | `lab(8.31261% .542074 -1.9154)`|

### Status colors (badges)

Background is an `oklab()` version of the same hue as the border, darkened down (~0.38–0.41 lightness) at 70% opacity — that pattern holds for blue/green/orange. Red doesn't follow it (checked the math, no consistent lightness/chroma/hue relationship across the three), so red's background is **constructed, not extracted** — same recipe (avg lightness of the other three, chroma scaled ~65% of the border, same hue angle as red's border), not a real value pulled from the site.

| Color | Border | Background |
|-------|--------|------------|
| blue | `lab(65.0361 -1.42065 -56.9802)` | `oklab(0.378993 -0.0114082 -0.145541 / 0.7)` |
| green | `lab(78.503 -64.9265 39.7492)` | `oklab(0.392999 -0.0842891 0.0438199 / 0.7)` |
| orange | `lab(70.0429 42.5156 75.8207)` | `oklab(0.408004 0.0966848 0.0760221 / 0.7)` |
| red | `lab(63.7053 60.745 31.3109)` | `oklab(0.393332 0.1166208 0.0489691 / 0.7)` |

---

## Parsed from https://shadcnuikit.com/dashboard/default 


### Non-color

| Variable | Value |
|---|---|
| `--animate-pulse` | `pulse 2s cubic-bezier(.4,0,.6,1) infinite` |
| `--animate-spin` | `spin 1s linear infinite` |
| `--aspect-video` | `16/9` |
| `--blur-md` | `12px` |
| `--blur-sm` | `8px` |
| `--breakpoint-lg` | `64rem` |
| `--breakpoint-md` | `48rem` |
| `--breakpoint-sm` | `40rem` |

### Color

| Variable | Value | Hex |
|---|---|---|
| `--accent` | `lab(8.31261% .542074 -1.9154)` | `#18181b` |
| `--accent-foreground` | `lab(90.6739% .53075 -1.9261)` | `#e4e4e8` |
| `--background` | `lab(2.51549% .19104 -.702733)` | `#09090b` |
| `--base-50` | `lab(98.2487% .13262 -.472021)` | `#fafafb` |
| `--base-100` | `lab(96.1486% .269413 -.982153)` | `#f4f4f6` |
| `--base-200` | `lab(90.6739% .53075 -1.9261)` | `#e4e4e8` |
| `--base-300` | `lab(84.966% .806063 -2.9036)` | `#d3d4da` |
| `--base-400` | `lab(65.6739% 1.21629 -4.34661)` | `#9e9fa7` |
| `--base-500` | `lab(47.8878% 1.65495 -5.77277)` | `#70717b` |
| `--base-600` | `lab(35.1389% 1.52317 -5.29942)` | `#51525b` |
| `--base-700` | `lab(26.8115% 1.2424 -4.32693)` | `#3e3f46` |
| `--base-800` | `lab(15.7118% .831872 -2.88485)` | `#26272b` |
| `--base-900` | `lab(8.31261% .542074 -1.9154)` | `#18181b` |
| `--base-950` | `lab(2.51549% .19104 -.702733)` | `#09090b` |
| `--base-1000` | `lab(.793976% .0596121 -.219867)` | `#030303` |
| `--border` | `lab(15.7118% .831872 -2.88485)` | `#26272b` |
| `--card` | `lab(2.51549% .19104 -.702733)` | `#09090b` |
| `--card-foreground` | `lab(90.6739% .53075 -1.9261)` | `#e4e4e8` |
| `--chart-1` | `lab(98.2487% .13262 -.472021)` | `#fafafb` |
| `--chart-2` | `lab(65.6739% 1.21629 -4.34661)` | `#9e9fa7` |
| `--chart-3` | `lab(90.6739% .53075 -1.9261)` | `#e4e4e8` |
| `--chart-4` | `lab(35.1389% 1.52317 -5.29942)` | `#51525b` |
| `--chart-5` | `lab(26.8115% 1.2424 -4.32693)` | `#3e3f46` |