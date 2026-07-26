# Umbra UI

Umbra is the shared React UI foundation for a family of applications. It centralizes design
tokens, theme behavior, reusable primitives, and proven structural shells so consuming
projects can compose consistent interfaces without copying shared source.

Current consumers include Guzzler and QB. Their domain-specific screens, workflows, state,
and data integration remain in those repositories.

## Install

Until versioned package publishing is implemented, install directly from this repository:

```bash
npm install git+https://github.com/JedWag/umbra-ui.git
```

For coordinated local development, a consumer can temporarily use a sibling checkout:

```bash
npm install file:../umbra-ui
```

Restore the Git dependency before committing consumer changes.

## Configure styles

Import Umbra after Tailwind and the shadcn base styles:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "umbra/theme.css";
```

The stylesheet includes Outfit, light and dark tokens, shared status colors, base element
styles, and an `@source` rule that lets Tailwind scan Umbra's source when installed under
`node_modules`.

## Configure themes

`ThemeProvider` stores `light` or `dark` in `localStorage`. If no valid stored value exists,
it follows the operating-system preference.

```tsx
import { ThemeProvider, Toaster } from "umbra"

function App() {
  return (
    <ThemeProvider storageKey="myapp-theme">
      {/* Application UI */}
      <Toaster />
    </ThemeProvider>
  )
}
```

Components and utilities are imported from the package barrel:

```tsx
import { AppShell, Button, Card, Dialog, ThemeToggle } from "umbra"
```

Umbra uses browser APIs for themes, responsive behavior, sidebar persistence, and interactive
components. Render it in a client-side environment.

## Contribute

Check whether a shared component already exists before adding another. Experimental or
domain-specific UI should begin in its consuming project. Promote it to Umbra only after its
shared responsibility and project-neutral API are clear.

Add shadcn primitives from this repository root:

```bash
npx shadcn add <component>
```

Export every public component, hook, type, and utility through `src/index.ts`, then run:

```bash
npx tsc --noEmit
```

See `docs/` for the package architecture, UI ownership and design rules, distribution model,
and recorded decisions.
