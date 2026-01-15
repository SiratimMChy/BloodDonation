# Hemovia Design System

A centralized design system for the **Hemovia platform**, built to ensure visual consistency, accessibility, and scalability while reinforcing Hemovia’s blood-donation–focused brand identity.

---

## ✨ Purpose

The Hemovia Design System provides reusable styles, components, and layout rules that:

* Maintain a consistent UI/UX across the platform
* Reduce design and development inconsistencies
* Support accessibility and dark mode by default
* Speed up feature development using shared components

---

## 🎨 Color System

Hemovia uses a **3-color system** (Primary, Secondary, Accent) with DaisyUI neutrals for seamless light/dark mode support.

### Primary (Blood Theme)

Used for branding and main actions.

* `#fef2f2` – Light backgrounds
* `#fee2e2` – Badge backgrounds
* `#dc2626` – Primary brand color
* `#b91c1c` – Hover/active states

### Secondary (Success – Green)

Used for confirmations and positive actions.

* `#059669`
* `#047857`

### Accent (Info – Blue)

Used for informational or secondary emphasis.

* `#2563eb`
* `#1d4ed8`

---

## 📐 Spacing Scale

A fixed spacing scale ensures layout consistency.

```css
--spacing-xs: 0.75rem; /* 12px */
--spacing-sm: 1rem;    /* 16px */
--spacing-md: 1.5rem;  /* 24px */
--spacing-lg: 2rem;    /* 32px */
--spacing-xl: 2.5rem;  /* 40px */
```

---

## 🔲 Border Radius

```css
--radius-small: 0.5rem;   /* 8px */
--radius-default: 0.75rem; /* 12px */
--radius-large: 1rem;     /* 16px */
--radius-full: 9999px;    /* Pills & badges */
```

---

## 🧩 Components

### Cards

```jsx
<Card>Standard</Card>
<Card variant="elevated">Important</Card>
<Card interactive>Clickable</Card>
```

### Buttons

```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="success">Approve</Button>
<Button variant="accent">Learn More</Button>
```

### Badges

```jsx
<Badge variant="primary">Featured</Badge>
<Badge variant="secondary">Verified</Badge>
<Badge variant="accent">24/7</Badge>
```

### Inputs

```jsx
<Input label="Email" placeholder="Enter email" />
<Input label="Password" error="Required" />
```

---

## 🔤 Typography

### Headings

* **H1** – Page titles
* **H2** – Section titles
* **H3** – Subsections
* **H4** – Card titles

```txt
H1: text-3xl → text-5xl | font-black
H2: text-2xl → text-4xl | font-bold
H3: text-xl → text-2xl | font-bold
H4: text-lg → text-xl | font-semibold
```

### Body Text

* Large – Descriptions
* Default – Body content
* Small – Captions

Uses `text-base-content` with opacity for readability.

---

## 🧱 Layout System

### Container

```jsx
<div className={LAYOUT.container}>...</div>
```

### Grid Presets

```jsx
<div className={LAYOUT.grid.cards}>...</div>
<div className={LAYOUT.grid.stats}>...</div>
```

---

## 📱 Responsive Breakpoints

| Device  | Width           |
| ------- | --------------- |
| Mobile  | < 640px         |
| Tablet  | 640px – 1024px  |
| Desktop | 1024px – 1280px |
| Large   | > 1280px        |

---

## 🌙 Dark Mode

Dark mode is supported automatically via DaisyUI.

```html
data-theme="light"
data-theme="dark"
```

---

## 🎞 Animations

* **Cards:** shadow + lift
* **Buttons:** subtle scale
* **Links:** underline on hover

```txt
Fast: 200ms
Default: 300ms
Slow: 500ms
```

---

## ♿ Accessibility

* WCAG AA color contrast
* Visible focus states
* Full keyboard navigation
* Semantic HTML & ARIA labels

---

## 🔄 Migration Guide

### Replace

* Custom padding → spacing tokens
* Mixed border radius → `rounded-xl`
* Custom colors → 3-color system
* Custom UI → shared components

### Example

````jsx
<Card>
```jsx
// OLD
<div className="bg-base-200 rounded-lg p-4 shadow-md">

// NEW
<Card>
````

---

## ✅ Status

This design system is **actively used** across the Hemovia platform and should be followed for all new features and UI updates.

---

**Hemovia Design System** — Consistent. Accessible. Life‑saving by design.
