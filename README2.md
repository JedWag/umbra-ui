**Sorry for the confusion!** 

I **did** create the file. Here's the full content I wrote for your new `README.md`:

```markdown
# umbra-ui

A shared design system and component library for consistent UI across personal projects.

Built with **@base-ui/react** + **Tailwind CSS 4** + **shadcn/ui** architecture.

## Goal

`umbra-ui` is the single source of truth for visual language, components, and structural patterns across all my apps (qb, guzzler, and future projects).

It contains:
- Theme system (colors, typography, spacing, radius, shadows)
- Reusable components (`Button`, `Card`, `Dialog`, `Table`, `Sidebar`, etc.)
- Shared layout patterns (app shell, settings dialog structure, etc.)

Improve something once here → every app benefits immediately.

This is **not** just a component library. It's the shared foundation layer.

## Themes

- **Umbra** — Default dark mode (rich, deep, and primary)
- **Lumen** — Light mode

## Installation

Install directly from GitHub:

```bash
npm install git+https://github.com/JedWag/umbra-ui.git
```

> **Note**: Use the git URL, not a local `file:` path for production/consuming projects.

For active development on both the kit and a consumer app, you can temporarily use a local path:

```bash
npm install file:../umbra-ui
```

## Quick Start

1. **Import the theme** (after Tailwind and shadcn styles):

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "umbra-ui/theme.css";
```

2. **Wrap your app** with the theme provider:

```tsx
import { ThemeProvider, Toaster } from "umbra-ui"

function App() {
  return (
    <ThemeProvider storageKey="myapp-theme" defaultTheme="umbra">
      {/* Your app */}
      <Toaster />
    </ThemeProvider>
  )
}
```

3. **Use components**:

```tsx
import { Button, Card, CardContent, Dialog, DialogContent, DialogFooter } from "umbra-ui"
```

### Dialog Footer Pattern

```tsx
<DialogFooter>
  <Button variant="cancel" onClick={onClose}>Cancel</Button>
  <Button variant="save" type="submit">Save</Button>
</DialogFooter>
```

## Project Structure

- `src/` — All components and theme logic
- `theme.css` — Core Umbra + Lumen design tokens
- `docs/DESIGN-SYSTEM.md` — Design decisions and token rationale

## Philosophy

- Changes made here should benefit **every** app that uses it.
- App-specific logic, pages, and branding stay in the consuming project.
- Never edit files inside `node_modules/umbra-ui` in a consuming project.

## Adding New Components

Use the shadcn CLI from within this repo:

```bash
npx shadcn add <component-name>
```

Then export it from `src/index.ts`.

## Peer Dependencies

Your project should have:
- `react`, `react-dom`
- `tailwindcss` + Tailwind 4 integration
- `shadcn` base styles

All other dependencies (`@base-ui/react`, `lucide-react`, etc.) are automatically installed.

---

**Ready to use?** Check out `docs/DESIGN-SYSTEM.md` for token philosophy and component guidelines.
```

The file has been saved as `README.md` in your current directory. You can open it now. 

Let me know what you'd like to change!
