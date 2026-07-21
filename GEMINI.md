# GEMINI.md — Project Goals & Architectural Rules

## 1. Primary Objective
Establish and expand `umbra` as a centralized **Platform SDK**, **Application Harness**, and **Standard Operating Environment (SOE)** for all downstream applications (e.g., `qb`, `guzzler`). 

The goal is to provide an opinionated, plug-and-play foundation that encapsulates layout architecture, execution boundaries, design tokens, and spacing rules—preventing low-level primitive sprawl and visual inconsistency across apps.

---

## 2. Core Architectural Principles

### A. Framework, Not Just Primitives
- Treat `umbra` as an **Application Framework**. 
- It provides composite structural modules (`AppShell`, `SettingsDialogShell`, `SettingsTabSection`) and runtime wrappers, not just isolated UI elements.
- **Do not** assemble custom page structures or layout containers out of raw HTML/Tailwind `div`s when composite modules exist or should be created.

### B. Strict Vertical Rhythm & Spacing Invariants
To guarantee mathematical visual consistency across all screens:
- **Zero Outer Margins on Text:** `NEVER` add arbitrary top or bottom margins (`mt-*`, `mb-*`, `my-*`) directly to text elements (`h1`-`h6`, `p`, `label`). Text height must strictly equal line-height.
- **Containers Own All Spacing:** Parent containers (flex/grid) control all vertical and horizontal element distance using `gap-*` utilities.
- **Standard Scale:**
  - `gap-1` / `gap-2` (4px–8px): Tight pairings (Title + Subtitle, Label + Input).
  - `gap-4` (16px): Content stacks (Forms, paragraphs inside body blocks).
  - `gap-6` / `gap-8` (24px–32px): Major layout divisions, dialog sections, panel padding.

### C. Component Composition & Smart Defaults
- Structural modules must accept `children` (slots) for dynamic content while locking down internal layout geometry and gaps.
- Modules should ship with sensible, configurable default properties (e.g., standard action labels) that consuming apps can override only when necessary.

---

## 3. Development Workflow: Local-First, Promote Later
1. **Check Existing Modules First:** Always verify if a layout, dialog shell, or structural pattern already exists in `umbra`.
2. **Build Locally When Exploring:** If a required feature or layout doesn't exist yet, build it locally inside the specific consuming application repository (`qb`, `guzzler`).
3. **Design for Promotion:** Write local custom components as clean, self-contained modules with props and slots so they can easily be extracted into `umbra` when needed across multiple apps.

---

## 4. Expected Code Behavior for Gemini
- **Adhere to System Boundaries:** Respect the distinction between application-specific content and shared platform architecture.
- **Maintain Scannable UI:** Write clean, modular, highly readable code without reinventing layout wheels or applying manual inline spacing fixes.
- **Preserve Package Integrity:** Maintain single barrel re-exports (`src/index.ts`) and ensure Tailwind content scanner constraints (`@source` directives) remain functional across `node_modules`.