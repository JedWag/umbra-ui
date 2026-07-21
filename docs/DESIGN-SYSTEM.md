# Dark Dashboard Design System

The rationale doc behind the `umbra` package (`~/Github/umbra`) — originally
extracted from the `guzzler` (eco-mileage) React frontend, itself derived from the
shadcnuikit.com reference dashboard. **This file explains *why* the kit looks the way it
does**; the kit itself (`src/`) is what you actually install and import — don't hand-copy CSS
values out of this doc when the package already ships them as real tokens/components.

## Stack this assumes

- React + TypeScript + Vite
- Tailwind CSS 4 (`@import "tailwindcss"` style, not the old `tailwind.config.js` setup)
- A shadcn-style component library scaffolded via the `shadcn` CLI, built on `@base-ui/react`
  (not Radix directly)
- `next-themes` for dark mode, `sonner` for toasts, `lucide-react` for icons
- `class-variance-authority` + `tailwind-merge` + `clsx` for component variants

```json
"dependencies": {
  "@base-ui/react": "^1.6.0",
  "@fontsource/outfit": "^5.2.8",
  "@tailwindcss/vite": "^4.3.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "cmdk": "^1.1.1",
  "lucide-react": "^1.24.0",
  "next-themes": "^0.4.6",
  "shadcn": "^4.13.0",
  "sonner": "^2.0.7",
  "tailwind-merge": "^3.6.0",
  "tailwindcss": "^4.3.2",
  "tw-animate-css": "^1.4.0"
}
```

New UI primitives (buttons, dialogs, tables, etc.) should be scaffolded with the `shadcn`
CLI into `components/ui/`, not hand-built — that's what keeps everything consistent.

## Philosophy

- **The palette below is the complete, closed set of colors.** It is not a sample or a
  starting point — every UI color need gets satisfied from this table, or from a documented
  composite of two entries in it (see "canvas" below). Never invent or eyeball a new hex
  value from a screenshot.
- **Real, deliberate type scale.** Distinct heading/body/label/meta sizes — not near-duplicate
  px values that all look the same at a glance.
- **One shared border color**, used everywhere: card edges, sidebar edge, topbar edge, table
  row dividers. Don't introduce per-component border colors.
- **Composited colors go through the actual overlay mechanism**, never baked into a base
  token. Example: "canvas" (the plain background showing behind cards) isn't its own CSS
  variable — it's `--background` with `--muted` composited over it at 40% opacity via a
  `bg-muted/40` wrapper `<div>` on the main content area. If a future color need turns out to
  be another composite, implement it the same way (a wrapper with opacity), not as a new flat
  token.

## Vocabulary

- **Sidebar** — the nav panel on the side of the screen.
- **Topbar** — the strip across the top of the screen.
- **Canvas** — the plain background behind everything, showing through around/behind cards.
- **Card** — a bounded content box sitting on the canvas (a table, a tile, a form section).

## Typography

- **Font: Outfit**, loaded via `@fontsource/outfit` static weights 400/500/600 (not the
  variable-font package — the reference site's own `font-family` is literally `Outfit`, not
  `Outfit Variable`). Only `font-normal` / `font-medium` / `font-semibold` are actually used.
- A local metric-matched fallback (`Outfit Fallback`, based on `local(Arial)`) is registered
  so there's no layout shift before the webfont loads:

```css
@font-face {
  font-family: "Outfit Fallback";
  src: local(Arial);
  ascent-override: 100.18%;
  descent-override: 26.05%;
  line-gap-override: 0.0%;
  size-adjust: 99.82%;
}
```

```css
--font-sans: Outfit, "Outfit Fallback", sans-serif;
```

## Type scale (every size in the app, and where it's used)

Only five Tailwind sizes are used anywhere, and each one maps to a specific role — no
near-duplicate sizes, no arbitrary values:

| Class | Size | Role | Where |
|---|---|---|---|
| `text-2xl` | 24px | Page/brand title | Page `<h1>`s (`Trip Logs`, `Monthly Reports`), sidebar brand wordmark (`Guzzler`) — always paired with `font-semibold tracking-tight` |
| `text-lg` | 18px | Dialog/section title | `DialogTitle` (`font-semibold`), Settings tab section headings (`font-medium`) |
| `text-base` | 16px | Nav items, form inputs | Sidebar nav buttons (`h-10 text-base`); `<Input>`/`<Textarea>` text on mobile (see note below) |
| `text-sm` | 14px | **The default** — labels, buttons, body copy | `<Label>`, `<Button>`, table cells, dropdown/select items, dialog description paragraphs (`text-sm text-muted-foreground`), form inputs on desktop |
| `text-xs` | 12px | Meta/auxiliary | Badges, sidebar group headings, keyboard-shortcut hints, calendar day-of-week labels, mobile-width settings tab labels |

**Weights**: only `font-normal`/`font-medium`/`font-semibold` exist (matches the three Outfit
weights actually loaded — 400/500/600). Labels and buttons are `font-medium`; titles are
`font-semibold`; body/paragraph text is unweighted (`font-normal`, i.e. no class needed).

**The `text-base` → `text-sm` responsive swap on inputs is deliberate, not an inconsistency**:
`<Input>`/`<Textarea>` render `text-base` by default and `md:text-sm` from the `md:` breakpoint
up. Below 16px, iOS Safari auto-zooms the page on focusing a text input — so mobile stays at
16px specifically to suppress that zoom, while desktop drops to the standard 14px body size.
Carry this pattern over verbatim; don't "simplify" it to a single fixed size.

**Rule when adding new UI**: pick from this table, don't introduce a sixth size. If nothing
fits, it's a sign the element should be reusing an existing role (e.g. a card title is a
`text-lg`/section-title role, not a new size).

## Palette (dark mode)

All values are exact, pulled from the reference site's computed styles — not eyeballed.
`lab(L a b)` and hex are equivalent; paste either directly as CSS colors.

### Structure

| Term | Value | Notes |
|------|-------|---|
| canvas (page background) | `lab(4.3721% 0.31183 -1.13819)` | not its own token — `--background` with `--muted` composited at 40% opacity via a `bg-muted/40` wrapper div |
| card background | `lab(2.51549% .19104 -.702733)` | |
| sidebar background | `lab(8.31261% .542074 -1.9154)` | |
| topbar background | `lab(2.51549% .19104 -.702733)` | reuses card background, not its own token |
| border (shared everywhere) | `lab(15.7118% .831872 -2.88485)` | card edge, sidebar edge, topbar edge, table dividers all use this one value |

### Text

| Role | Value |
|------|-------|
| primary text (headings, body) | `lab(90.6739% .53075 -1.9261)` |
| muted/secondary text (labels, meta) | `lab(65.6739% 1.21629 -4.34661)` |

### Accent / primary button

| Role | Value |
|------|-------|
| button fill | `lab(98.2487% .13262 -.472021)` |
| text on that button | `lab(8.31261% .542074 -1.9154)` |

### Status colors (badges/pills)

The background is an `oklab()` version of the same hue as the border, darkened to
~0.38–0.41 lightness, at 70% opacity. (Red doesn't follow the exact math of the other
three — its background below is constructed with the same recipe rather than extracted.)

| Color | Border | Background |
|-------|--------|------------|
| blue | `lab(65.0361 -1.42065 -56.9802)` | `oklab(0.378993 -0.0114082 -0.145541 / 0.7)` |
| green | `lab(78.503 -64.9265 39.7492)` | `oklab(0.392999 -0.0842891 0.0438199 / 0.7)` |
| orange | `lab(70.0429 42.5156 75.8207)` | `oklab(0.408004 0.0966848 0.0760221 / 0.7)` |
| red | `lab(63.7053 60.745 31.3109)` | `oklab(0.393332 0.1166208 0.0489691 / 0.7)` |

## Full CSS variable table (base-50 → base-1000 ramp + semantic aliases)

This is the actual `.dark { ... }` block plus the `--base-*` ramp, copy-pasteable:

```css
.dark {
  --background: lab(2.51549% 0.19104 -0.702733);
  --foreground: lab(90.6739% 0.53075 -1.9261);
  --card: lab(2.51549% 0.19104 -0.702733);
  --card-foreground: lab(90.6739% 0.53075 -1.9261);
  --popover: lab(2.51549% 0.19104 -0.702733);
  --popover-foreground: lab(90.6739% 0.53075 -1.9261);
  --primary: lab(98.2487% 0.13262 -0.472021);
  --primary-foreground: lab(8.31261% 0.542074 -1.9154);
  --secondary: lab(47.8878% 1.65495 -5.77277);
  --secondary-foreground: lab(90.6739% 0.53075 -1.9261);
  --muted: lab(8.31261% 0.542074 -1.9154);
  --muted-foreground: lab(65.6739% 1.21629 -4.34661);
  --accent: lab(8.31261% 0.542074 -1.9154);
  --accent-foreground: lab(90.6739% 0.53075 -1.9261);
  --destructive: lab(63.7053% 60.745 31.3109);
  --border: lab(15.7118% 0.831872 -2.88485);
  --input: lab(26.8115% 1.2424 -4.32693);
  --ring: lab(90.6739% 0.53075 -1.9261);
  --chart-1: lab(2.51549% 0.19104 -0.702733);
  --chart-2: lab(35.1389% 1.52317 -5.29942);
  --chart-3: lab(15.7118% 0.831872 -2.88485);
  --chart-4: lab(65.6739% 1.21629 -4.34661);
  --chart-5: lab(84.966% 0.806063 -2.9036);
  --sidebar: lab(8.31261% 0.542074 -1.9154);
  --sidebar-foreground: lab(90.6739% 0.53075 -1.9261);
  --sidebar-primary: lab(98.2487% 0.13262 -0.472021);
  --sidebar-primary-foreground: lab(8.31261% 0.542074 -1.9154);
  --sidebar-accent: lab(15.7118% 0.831872 -2.88485);
  --sidebar-accent-foreground: lab(90.6739% 0.53075 -1.9261);
  --sidebar-border: lab(15.7118% 0.831872 -2.88485);
  --sidebar-ring: lab(90.6739% 0.53075 -1.9261);
}
```

Raw base ramp (for anything needing a specific step rather than a semantic alias):

| Token | lab() | Hex |
|---|---|---|
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

Light mode is the reference dashboard's `default` theme preset's `:root` block, extracted the
same way as the dark palette above — real values pulled from the reference site's compiled CSS,
not shadcn's stock neutrals and not eyeballed.

## Spacing system

There's one repeating scale used everywhere — no per-page one-off margins:

- **Field group** (label + input): `flex flex-col gap-2` — that's `0.5rem` / `8px` of vertical
  gap between the `<Label>` and its input, every time, no exceptions
- **Field-to-field** — two inputs next to each other, in *either* direction: `gap-4` (`16px`),
  every time. Two field groups stacked vertically use `flex flex-col gap-4`; two field groups
  side by side (First name / Last name, Employee / Date) use `grid grid-cols-2 gap-4`. Same
  number both ways — the gap doesn't change with orientation, only the flex direction does.
- **Page padding**: `<main className="p-6">`
- **Dialog body padding**: `p-6` (baked into `DialogContent`), with `gap-6` between header/body/footer
- **Dialog footer**: bleeds to the dialog's edges with `-mx-6 -mb-6 p-6`, gets its own `border-t`
  and a slightly-lighter `bg-muted/50` than the dialog body — footers read as a visually
  separate strip, not just more of the same card
- **Card padding**: `--card-spacing: --spacing(4)` (`16px`) — this one variable drives the
  card's own top/bottom padding *and* the left/right padding of everything inside it
  (`CardHeader`, `CardContent`, `CardFooter` all use `px-(--card-spacing)`), so the card's
  content never gets closer to any edge than 16px.
- **Card title-to-description gap** (inside `CardHeader`, e.g. a title over a one-line
  description): `gap-1` (`4px`) — much tighter than the 8px label gap, since title+description
  read as one unit rather than two related-but-separate fields.
- **Sidebar nav items**: `gap-1.5` between menu items, each item `h-10`

### Page-title vertical rhythm (title → subtitle → content below)

This is the exact stack every page (`Trip Logs`, `Monthly Reports`) uses, and it's worth
naming precisely since it's not built from the label/field scale above:

```tsx
<div className="mb-6">
  <h1 className="text-2xl font-semibold tracking-tight">Page Title</h1>
  <p className="text-sm text-muted-foreground">One-line description of the page.</p>
</div>
<Card>...</Card>  {/* or the form, whatever's next */}
```

- **`<h1>` → `<p>` subtitle**: **zero** extra gap — no margin/gap utility between them at all.
  They're just two block elements stacked with nothing but their own line-height separating
  them. Title and subtitle read as one tightly-bound unit, not two spaced-apart pieces.
- **Title block → first card/content below it**: `mb-6` (`24px`) on the wrapping div — the
  same `6`/`24px` step used for dialog outer padding, i.e. "one full section break."
- Card content then adds its own `16px` inset on top of that (card padding, above) — so the
  actual gap you *see* between a page's subtitle text and the first line of table/form content
  inside the card below it is `24px + 16px = 40px`, but that's two independently-named spacings
  stacking, not a single 40px token — never hardcode `40px` directly.

Rule of thumb when adding a new form: 2 for a label-to-its-own-input gap, 4 for gaps between
different fields/groups, 6 for a section break (page title block, dialog outer padding). Don't
introduce a 3 or a 5.

## Buttons

Built with `class-variance-authority` on top of `@base-ui/react`'s `Button` primitive.

**Variants**: `default` (solid primary fill), `outline`, `secondary`, `ghost`, `destructive`
(tinted red, not solid — `bg-destructive/10 text-destructive hover:bg-destructive/20`, darker
tint in dark mode), `link`.

**Sizes**: `default` (h-9), `sm` (h-8), `xs` (h-6), `lg` (h-10), plus icon-only squares
`icon`/`icon-sm`/`icon-lg`/`icon-xs`. Icons inside buttons default to `size-4` (`size-3` at the
`xs`/`icon-xs` sizes) via an automatic `[&_svg:not([class*='size-'])]:size-*` selector — you
don't hand-size icons per button.

**Every entity dialog (Employee/Purpose/Location/Rate/Trip) uses the same non-default button
coloring for its two footer actions**, layered on top of the `outline` variant via arbitrary
`lab()`/`oklab()` values (the same status-color values from the palette table above, at low
opacity for the fill):

- **Cancel** → orange: border/text `lab(70.0429 42.5156 75.8207)`, background
  `oklab(0.408004 0.0966848 0.0760221 / 0.7)`, and the border/fill/text swap on hover (fill
  becomes solid orange, text becomes the tint color).
- **Save/primary submit** → green: border/text `lab(78.503 -64.9265 39.7492)`, background
  `oklab(0.392999 -0.0842891 0.0438199 / 0.7)`, same hover-swap behavior.

This pairing (not the default primary-fill button) is deliberate for dialog footers
specifically — it's what makes Cancel read as a real, differentiated choice next to Save
rather than a plain gray "close" button. Regular in-page actions (e.g. "Generate Report",
"Add location") stay on the plain `default` variant.

**Consuming this pairing**: use `<DialogActions onCancel={...} onSave={...} />` instead of
assembling `DialogFooter` + two `Button`s by hand — it bakes in `split` positioning (Cancel left,
Save right, via `sm:justify-between`) and the cancel/save variant colors above, so consuming apps
never repeat that assembly. Optional `cancelLabel`/`saveLabel`/`saveDisabled` props cover the
common variations. `DialogFooter`'s raw `split` prop still exists for footers that don't fit this
exact two-button shape.

## Table

Stock shadcn table primitive, unmodified:

- **Header cell (`<th>`)**: `h-10 px-2` — fixed 40px row height, 8px horizontal padding, no
  vertical padding (height is controlled by `h-10`, not by padding).
- **Body cell (`<td>`)**: `p-2` — 8px on *all four sides*. Note this is different from the
  header, which only pads horizontally; body rows get their vertical breathing room from
  padding, header rows get it from a fixed height.
- **Row border**: every `<tr>` gets `border-b`, **except** the last row in `<tbody>`
  (`[&_tr:last-child]:border-0`) — so the table's own bottom edge doesn't double up with the
  card's bottom edge/border.
- **Row hover**: `hover:bg-muted/50` — same muted-at-50% tint used elsewhere (dialog footer,
  table footer), not a new hover color.
- Text is `text-sm` throughout (see type scale) — tables never step down to `text-xs` even
  though they're dense, muted/secondary columns (e.g. an address column) just get
  `text-muted-foreground` at the same size rather than a smaller size.
- Tables live inside a `<Card><CardContent>` with no extra padding override — so a table's
  first column sits exactly `16px` (card padding) from the card's left edge, `8px` (cell
  padding) from there to the actual cell text.

## Settings dialog (tabbed ribbon)

The Settings dialog (`settings-dialog.tsx`) is the one place in the app with a horizontal tab
ribbon instead of a single form — worth documenting as its own pattern since nothing else looks
like it.

- **Sizing**: pinned near the top of the viewport rather than dead-center — `top-[15%]`,
  `max-h-[80vh]` — and much wider than a normal dialog, `sm:max-w-4xl` vs. the entity dialogs'
  `sm:max-w-lg`/default. It's a small app-within-the-dialog, not a form.
- **Tab list**: one `TabsList` row above the content, `h-11` on mobile / `h-9` from `sm:` up,
  each `TabsTrigger` pairing a `size-4` `lucide-react` icon with a label that's itself
  responsive text — `text-xs sm:text-sm` — so tab labels shrink before anything reflows on
  narrow viewports. This is the *only* place in the app where a text size itself is responsive
  rather than fixed (contrast with the input `text-base`→`md:text-sm` swap, which is about
  touch-zoom, not fitting more tabs in).
- **Tab panel spacing**: each `TabsContent` gets `mt-6` (24px) below the tab row — same "section
  break" 24px used for page-title-to-content (see Spacing above), reused here as
  tab-row-to-panel-content.
- **Per-tab section header**: inside each panel, a small reusable `SettingsTabSection`
  component renders `<h3 className="text-lg font-medium">{title}</h3>` (the 18px "section
  title" role from the type scale) next to a right-aligned action button (`Add Employee`, `Add
  Location`, etc.), with `gap-4` (16px) between that header row and the table beneath it:
  ```tsx
  <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
    <div className="flex shrink-0 items-center justify-between">
      <h3 className="text-lg font-medium">{title}</h3>
      {action}
    </div>
    <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
  </div>
  ```
  So: tab row → (24px) → section title+action row → (16px) → table. Two different "next
  section" gaps stacked back to back, not the same number reused twice.
- **Status pills**: active/inactive state (employees, purposes) uses the shared `Badge`
  component — `Active` reuses the green status-color pair from the palette table
  (`lab(78.503 -64.9265 39.7492)` border/text, matching `oklab(...)` fill at 0.7 opacity, same
  values as the Save button and the trip-dialog duplicate-warning accents), `Inactive` is a
  plain `variant="secondary"` badge, no custom color.
- **Row actions**: a single `Pencil` icon button (`variant="ghost" size="icon-sm"`) per row —
  either a direct "open edit dialog" button (Locations), or a `DropdownMenu` behind the same
  pencil icon offering `Edit` / `Activate`/`Deactivate` (Employees, Purposes) when a row needs
  more than one action.
- **Empty state**: every tab shows the same pattern when its list is empty — a single
  `text-sm text-muted-foreground` sentence ("No employees yet — add one above."), never a
  blank table or a dedicated empty-state illustration/component.

## Sidebar

Stock shadcn sidebar block (`components/ui/sidebar.tsx`), unmodified — don't rebuild this
from scratch, scaffold it with the `shadcn` CLI.

- **Widths**: expanded `16rem`, collapsed-to-icons `3rem`, mobile drawer `18rem`.
- **Collapse behavior**: `<Sidebar variant="inset">` with the default `collapsible="offcanvas"`
  — collapsing slides the sidebar fully off-canvas (not down to icon rail) and the content area
  reflows to fill the space, with a floating rounded "inset" look (rounded corners + margin
  around the main content panel) rather than the sidebar butting flush against the content.
- **Mobile**: below a `768px` breakpoint (`useIsMobile` / `use-mobile.ts`), the sidebar renders
  as a `Sheet` (slide-over drawer) instead of the fixed inset panel — it does not squeeze/wrap
  into a narrower column, it becomes an overlay.
- **Toggle**: `<SidebarTrigger />` button in the topbar, plus the `Cmd/Ctrl+B` keyboard
  shortcut, both wired up by the block itself.
- **Nav items** use `<SidebarNavButton icon={...}>Label</SidebarNavButton>`, not a hand-configured
  `SidebarMenuButton` — it bakes in `size="lg"` (`h-12 text-lg`) and `size-6` icons so consuming
  apps never choose or repeat that sizing themselves. Sized up from the button defaults so
  primary nav reads as visually distinct from body text, not the same scale as form labels.

### The rounded-corner "floating panel" look around the topbar

This is two separate pieces of rounding that have to agree, not one CSS property:

1. **`SidebarInset` itself** (the `<main>` that wraps topbar + page content, `variant="inset"`
   on `<Sidebar>`) gets, at `md:` and up: `m-2 ml-0 rounded-xl shadow-sm` — a `0.5rem` margin
   floating it off the viewport edge (no left margin, since the sidebar already sits there) and
   `rounded-xl` (`calc(var(--radius) + 4px)` → `0.875rem`/`14px`, since base `--radius` is
   `0.625rem`/`10px`) rounding **all four corners** of that whole panel, with a subtle drop
   shadow. This is what makes the entire content area read as a card floating on the canvas
   rather than a flush full-bleed panel.
2. **The topbar `<header>` inside it** sits flush at the very top of that rounded panel, so it
   independently repeats just the top two corners: `md:rounded-tl-xl md:rounded-tr-xl`
   (same `rounded-xl` radius). Without this, the header's own square top corners would poke out
   past the outer panel's rounded corners since `SidebarInset` doesn't clip its children with
   `overflow-hidden` — so the header has to round itself to match, not rely on the parent to
   clip it.

Net effect: on desktop the whole content region — topbar and page body together — reads as one
rounded card offset from the sidebar and viewport edge; the "curve" at the top is the header
matching its parent's corner radius, not a mask/clip. Below the `md:` breakpoint all of this
turns off (no margin, no rounding, no shadow) — inset mode is desktop-only, mobile is edge to
edge with the sidebar as a drawer over it.

## Layout structure

```tsx
<ThemeProvider>
  <BrowserRouter>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-4 md:rounded-tl-xl md:rounded-tr-xl">
          {/* left: SidebarTrigger + vertical Separator; right: theme toggle, settings, etc */}
        </header>
        <main className="flex-1 bg-muted/40 p-6">
          {/* routed page content */}
        </main>
      </SidebarInset>
    </SidebarProvider>
    <Toaster />
  </BrowserRouter>
</ThemeProvider>
```

The `bg-muted/40` on `<main>` is the canvas composite described above — don't replace it
with a flat color.

## Component conventions to carry over

- **Dialogs**: one component per entity (e.g. `employee-dialog.tsx`), reused across pages via
  a shared `entity-picker.tsx`-style combobox rather than reimplemented per page. Consistent
  internal spacing/label sizing/font weights across every dialog in the app — pick one dialog
  as the reference and match its spacing scale exactly for every new one, rather than
  eyeballing new dialogs into existence.
- **Dropdowns start genuinely blank** (no silently-defaulted-to-first-option state), except
  date pickers, which default to today.
- **Date/month inputs** use a dedicated `react-day-picker`-based field component, not native
  `<input type="date">`/`<input type="month">` (those are unstyleable and inconsistent
  cross-browser).
- **Toasts** (`sonner`) are the standard feedback channel for validation errors and action
  confirmations — not inline error text.
- **Dark mode** goes through the kit's own `ThemeProvider`/`useTheme` (`src/lib/theme-provider.tsx`)
  — a small hand-rolled context that toggles the `.dark` class and persists to `localStorage`.
  (Guzzler's original code had `sonner`'s toast theme reading from `next-themes` instead, which
  was never actually wired up — a latent bug, fixed in this kit so every themed component reads
  from the same provider.)
- **Primary nav is visually distinct from body text** — different size/weight, not styled like
  a body paragraph.
- **Required-field validation shows a visible, specific message** on violation, never fails
  silently.

## How to use this in another project

Install the package (see the kit's own `README.md` for the exact command), import
`umbra/theme.css` after your Tailwind imports, and import components from
`umbra` instead of hand-copying JSX/CSS out of this doc. Treat this file as background
for *why* things look the way they do — useful when deciding how to build something new that
isn't in the kit yet (a page layout, a new dialog) — not as the source of truth for values the
package already provides as real code.
