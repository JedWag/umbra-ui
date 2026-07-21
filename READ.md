# READ.md — Claude's Guide to Using & Updating the Platform SDK

> [!IMPORTANT]
> **To Claude:** Read this document carefully. You have been half-assing the UI implementation and ignoring the core architecture of this repository and its downstream applications. This document outlines the non-negotiable rules and structural workflow you MUST follow.

---

## 1. Core Objective: The Standard Operating Environment (SOE)
`umbra` is **not** a simple UI primitive dump or a copy-paste component library. It is a centralized **Platform SDK**, **Application Harness**, and **Standard Operating Environment (SOE)** for all downstream applications (e.g., `qb` and `guzzler`).

The goal is to lock down the design tokens, visual rhythm, and structural shells in one repository, ensuring that every downstream application maintains absolute visual and structural consistency.

---

## 2. Non-Negotiable Architectural Rules

### Rule A: Framework Over Primitives
* **Do not build custom layouts out of raw HTML/Tailwind divs.**
* Use the composite structural modules provided by this SDK:
  - [`AppShell`](file:///home/jed/Github/umbra/src/components/app-shell.tsx): The unified page shell layout (sidebar trigger, navigation header, canvas content area).
  - [`SettingsDialogShell`](file:///home/jed/Github/umbra/src/components/settings-dialog-shell.tsx): The complete settings page with tabbed ribbon, layout constraints, and save/cancel actions.
  - [`SettingsTabSection`](file:///home/jed/Github/umbra/src/components/settings-tab-section.tsx): Title + action header block over a scrollable body inside settings.
  - [`DialogActions`](file:///home/jed/Github/umbra/src/components/ui/dialog.tsx#L127-L150): The orange (Cancel) and green (Save) footer button preset.
  - [`IconButton`](file:///home/jed/Github/umbra/src/components/ui/button.tsx#L62-L70): The pre-configured ghost icon button wrapper.
  - [`SidebarNavButton`](file:///home/jed/Github/umbra/src/components/ui/sidebar.tsx): Nav-item presets matching spacing system rules.

### Rule B: Strict Spacing Invariants & Vertical Rhythm
To prevent layout guessing, you must follow these exact spacing scales:
* **ZERO OUTER MARGINS ON TEXT:** **NEVER** add `mt-*`, `mb-*`, or `my-*` classes to individual headings (`h1`–`h6`), paragraphs (`p`), or labels (`label`). Text elements must have zero outer margins, letting their heights equal line-height.
* **CONTAINERS OWN ALL SPACING:** All vertical and horizontal separation between elements must be controlled strictly by the parent flex or grid container using `gap-*` utilities.
* **STANDARD SPACING SCALE:**
  - `gap-1` or `gap-2` (4px–8px): Tight pairings (e.g., Title + Subtitle, Label + Input).
  - `gap-4` (16px): Content stacks (e.g., forms, stacked text sections, tables).
  - `gap-6` or `gap-8` (24px–32px): Major layout divisions, card padding, dialog body divisions.

### Rule C: Component Composition & Slots
* Structural layout modules must accept `children` (slots) to render dynamic content while locking down internal gaps, alignments, and padding.
* They should provide sensible default properties (e.g., standard button labels) that consuming apps override only when necessary.

---

## 3. Development Workflow: Local-First, Promote Later
1. **Check Existing SDK Modules First:** Before writing any custom layouts or Dialog wrappers, check if they exist in `umbra`.
2. **Build Locally When Exploring:** If a new feature or structural pattern is needed, build it locally inside the specific consuming application (e.g., `qb/frontend` or `guzzler/frontend`).
3. **Design for Promotion:** Write the custom local component as a clean, self-contained module with props and slots. Once stable and needed by another app, extract and promote it into `umbra`.

---

## 4. How to Update Downstream Apps to Use the SDK
Downstream apps (like `guzzler`) must be migrated to fully consume this package rather than implementing custom layouts or copying primitive files.

### Step 1: Declare the Dependency
Ensure the downstream `package.json` contains `umbra` pointed to the github repository:
```json
"dependencies": {
  "umbra": "git+https://github.com/JedWag/umbra.git"
}
```

### Step 2: Delete Redundant Local Components
If `umbra` exports a primitive (e.g., `button.tsx`, `dialog.tsx`, `card.tsx`), delete the corresponding local files from the app's `components/ui/` directory to prevent import duplication.

### Step 3: Replace Imports
Swap local imports to use the package:
```tsx
// DO NOT DO THIS:
import { Button } from "@/components/ui/button"

// DO THIS:
import { Button } from "umbra"
```

### Step 4: Import CSS & Enable Tailwind v4 Scanner
In the consuming app's root stylesheet (usually `index.css`), import the theme:
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "umbra/theme.css";
```
*Note: Because Tailwind v4's automatic content detection skips `node_modules`, `umbra/theme.css` uses the `@source` directive to scan its own source. Ensure the consuming build scanner correctly picks up the files.*

### Step 5: Audit Layouts and Forms
Refactor forms and pages:
* Remove all margin classes (`mb-4`, `mt-2`) on headings and paragraph tags.
* Wrap them in `div` containers with appropriate `gap-*` settings.

---

## 5. How to Update `umbra`
When making modifications directly in this repository:

1. **Adding Shadcn Primitives:**
   Run the CLI inside the root of this repo:
   ```bash
   npx shadcn add <component>
   ```
2. **Re-Export Everything:**
   Every new primitive or composite component must be added to the single barrel export file: [`src/index.ts`](file:///home/jed/Github/umbra/src/index.ts).
3. **Keep Theme Sync'd:**
   Theme tokens, including custom status backgrounds and layout radius values, are managed in [`src/styles/theme.css`](file:///home/jed/Github/umbra/src/styles/theme.css). Do not define ad-hoc hex codes; map them to CSS variables.
4. **Deploying Changes:**
   Since the package is installed via Git, after pushing your changes to GitHub, run this inside the consuming app's directory to update:
   ```bash
   npm install git+https://github.com/JedWag/umbra.git
   ```
   *(Or temporarily use a local `file:../` path during development, reverting to the git URL before committing).*
