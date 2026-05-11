# Powerload UI Kit — Design Guidelines

> Version 1.0 · Light Theme · Desktop First

---

## 1. Brand Identity

**Powerload** is a B2B logistics freight platform connecting shippers (_cargadores_) and carriers (_transportistas_). The visual language communicates reliability, speed, and operational clarity. The aesthetic is clean, professional, and data-dense — never decorative for decoration's sake.

**Core principles:**

- **Clarity over decoration** — every element earns its place.
- **Data density with breathing room** — information-rich screens with intentional whitespace.
- **Confidence through contrast** — the primary red is used with restraint to maximize impact.
- **Light always** — the platform is exclusively light theme. No dark mode variants.

---

## 2. Color System

### 2.1 Primary — Powerload Red

The brand red is the most important color in the system. It signals action, importance, and the Powerload brand.

| Token                     | Hex         | Usage                                                                               |
| ------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `primary/600`             | `#C22339`   | Primary CTA buttons, active nav items, brand accent, icon fills on colored surfaces |
| `primary/500`             | `#C22339`   | Same as 600 (aliases)                                                               |
| `primary/400`             | `#CF4758`   | Hover states on red elements                                                        |
| `primary/300`             | `#DB6971`   | Disabled/muted red accents                                                          |
| `primary/200`             | `#E6888C`   | Light accents, subtle highlights                                                    |
| `primary/100`             | `#EFA6A7`   | Very light red tints, tag backgrounds                                               |
| `primary/50`              | `#F6C4C4`   | Lightest red tint                                                                   |
| `primary/0`               | `#FBE1E1`   | Red-tinted backgrounds, alert surfaces                                              |
| `primary/800`             | `#8F1A31`   | Dark red for text on light red backgrounds                                          |
| `primary/900`             | `#5E1922`   | Darkest accessible red text                                                         |
| `primary/opacity/600-10%` | `#C414411A` | Red ghost hover backgrounds                                                         |
| `primary/opacity/600-20%` | `#C4144133` | Red focus rings, subtle overlays                                                    |

> **Rule:** Never use more than one red CTA per view. Red on red is forbidden. Use red to guide the user's eye to the single most important action on screen.

### 2.2 Neutrals

The backbone of the UI. All backgrounds, surfaces, text, and borders come from this scale.

| Token                     | Hex         | Usage                                                  |
| ------------------------- | ----------- | ------------------------------------------------------ |
| `neutral/0`               | `#FFFFFF`   | Page background, card surfaces, modal backgrounds      |
| `neutral/50`              | `#F9F9FC`   | Section backgrounds, sidebar background, alternate row |
| `neutral/100`             | `#F3F3F9`   | Input backgrounds (unfocused), tag backgrounds         |
| `neutral/200`             | `#ECECF4`   | Dividers, border on cards                              |
| `neutral/300`             | `#E1E1EC`   | Stronger borders, inactive step indicators             |
| `neutral/400`             | `#D2D2E1`   | Placeholder text, disabled borders                     |
| `neutral/500`             | `#BDBDD1`   | Secondary icons on light backgrounds                   |
| `neutral/600`             | `#A1A1B9`   | Caption text, helper text, breadcrumb separators       |
| `neutral/700`             | `#7E7E97`   | Secondary body text, icon default color                |
| `neutral/800`             | `#55556C`   | Body text, labels                                      |
| `neutral/900`             | `#2A2A38`   | Primary text, headings                                 |
| `neutral/950`             | `#000000`   | Maximum contrast text (use sparingly)                  |
| `neutral/opacity/950-10%` | `#0000001A` | Subtle shadow tints                                    |
| `neutral/opacity/950-20%` | `#00000033` | Overlay scrim (light)                                  |
| `neutral/opacity/950-50%` | `#00000080` | Modal backdrop                                         |

### 2.3 Semantic Colors

Used exclusively for status communication — never decoratively.

**Success**

- Surface: `success/0` `#E8F7EE`
- Icon/text: `success/600` `#48BB78`
- Strong: `success/700` `#389760`

**Warning**

- Surface: `warning/0` `#FFF7E5`
- Icon/text: `warning/600` `#FBC02D`
- Strong: `warning/800` `#AE7D03`

**Danger / Error**

- Surface: `danger/0` `#FBE4E4`
- Icon/text: `danger/600` `#E22824`
- Strong: `danger/700` `#B91C19`

**Info**

- Surface: `info/0` `#DBEEFF`
- Icon/text: `info/600` `#0174D9`

### 2.4 Accent Colors (Tertiary / Secondary / Quaternary)

Used sparingly for differentiating categories, tags, or highlights — not for brand moments.

- **Secondary (Green-teal):** `secondary/600` `#089F71` — eco/environmental features
- **Tertiary (Orange):** `tertiary/600` `#FB8C00` — highlighted/featured items (e.g. "Destacado" badge)
- **Quaternary (Pink):** `quaternary/600` `#EC407A` — reserved, rare use

---

## 3. Typography

### 3.1 Font Families

| Family      | Role                                                            | Weight Range |
| ----------- | --------------------------------------------------------------- | ------------ |
| **Poppins** | Primary — all UI text, headings, body, labels, captions         | 300–900      |
| **Raleway** | Secondary — marketing headlines, hero text, decorative contexts | 400–800      |

Import via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&family=Raleway:wght@400;600;700;800&display=swap" rel="stylesheet">
```

### 3.2 Type Scale (Desktop)

| Level         | Size | Weight       | Line Height | Letter Spacing | Usage                             |
| ------------- | ---- | ------------ | ----------- | -------------- | --------------------------------- |
| `title-h1`    | 60px | 600 SemiBold | 1.2         | -0.5px         | Hero sections only                |
| `title-h2`    | 56px | 600          | 1.2         | -0.25px        | Page titles                       |
| `title-h3`    | 48px | 600          | 1.2         | -0.25px        | Section titles                    |
| `title-h4`    | 36px | 600          | 1.2         | 0              | Card headers, modal titles        |
| `title-h5`    | 32px | 600          | 1.2         | 0              | Sub-section headers               |
| `title-h6`    | 24px | 600          | 1.2         | 0              | Component headers                 |
| `subtitle-l`  | 22px | 500          | 1.3         | 0              | Lead text, introductions          |
| `subtitle-m`  | 20px | 500          | 1.3         | 0              | Card subtitles, secondary headers |
| `subtitle-s`  | 18px | 500          | 1.3         | 0              | Form section labels               |
| `paragraph-l` | 16px | 400          | 1.4         | 0              | Primary body text                 |
| `paragraph-s` | 14px | 400          | 1.4         | 0              | Secondary body, table cells       |
| `caption`     | 12px | 500          | 1.4         | 1px            | Labels, badges, metadata          |
| `details`     | 10px | 500          | 1.4         | 1px            | Tooltips, legal, fine print       |

### 3.3 Typography Rules

- **Headings:** Always Poppins SemiBold (600) or Bold (700). Never use Regular weight for headings.
- **Body text:** Poppins Regular (400) or Medium (500).
- **Emphasis within body:** Use Medium (500) or SemiBold (600) — never italic, never underline (except links).
- **Brand highlights:** Key words in headlines can use the primary red (`#C22339`) — e.g. "Publica tu carga en **segundos** con IA".
- **Captions and labels:** Always uppercase-tracked (`letter-spacing: 1px`) at 12px.
- **Minimum body size:** 14px — never smaller for interactive text.
- **Raleway usage:** Reserve for marketing/landing sections or the brand wordmark. Do not use in tables, forms, or data-heavy UI.

---

## 4. Spacing System

All spacing is based on a **4px base unit**. The token names map directly:

| Token   | Value | Common Use                             |
| ------- | ----- | -------------------------------------- |
| `2xs`   | 4px   | Inline icon gap, tight label padding   |
| `xs`    | 8px   | Tag internal padding, compact list gap |
| `s`     | 12px  | Input vertical padding, chip padding   |
| `m`     | 16px  | Default gap between form elements      |
| `xm`    | 18px  | Card internal padding (vertical)       |
| `l`     | 20px  | Row height padding                     |
| `xl`    | 24px  | Section gap (tight), icon container    |
| `2xl`   | 28px  | Button horizontal padding (M size)     |
| `3xl`   | 32px  | Card padding, modal padding            |
| `4xl`   | 36px  | Section gap (standard)                 |
| `5xl`   | 40px  | Component vertical spacing             |
| `6xl`   | 44px  | —                                      |
| `7xl`   | 48px  | Page vertical padding, section gaps    |
| `8xl`   | 56px  | Large section separation               |
| `9xl`   | 64px  | —                                      |
| `4xl-7` | 72px  | Hero section padding                   |

**Layout:**

- Main layout max-width: **1440px**
- Horizontal page padding: **70px** left/right
- Vertical page padding: **48px**
- Vertical content gap: **36px**
- Horizontal content gap: **48px**
- Sidebar width: ~**210px** (expanded), ~**60px** (collapsed icon-only)

---

## 5. Border & Shape System

### 5.1 Corner Radii

| Token               | Value | Usage                                    |
| ------------------- | ----- | ---------------------------------------- |
| `corner-radius/2xs` | 4px   | Tags, chips, small badges                |
| `corner-radius/xs`  | 8px   | Input fields, small cards                |
| `corner-radius/s`   | 12px  | Buttons, tooltips                        |
| `corner-radius/m`   | 16px  | Standard cards, dropdowns                |
| `corner-radius/l`   | 24px  | Large cards, panels                      |
| `corner-radius/xl`  | 32px  | Modal containers, hero cards             |
| `corner-radius/2xl` | 48px  | Pill-shaped elements, avatar backgrounds |
| `corner-radius/3xl` | 64px  | —                                        |

### 5.2 Border Widths

| Token      | Value | Usage                               |
| ---------- | ----- | ----------------------------------- |
| `width/xs` | 0.5px | Hairline dividers                   |
| `width/s`  | 1px   | Default card borders, input borders |
| `width/m`  | 2px   | Focus rings, active states          |
| `width/l`  | 3px   | Emphasis borders                    |
| `width/xl` | 4px   | Strong highlight borders            |

**Rules:**

- Default card border: `1px solid neutral/200` (`#ECECF4`)
- Focus state: `2px solid primary/600` with `primary/opacity/600-20%` outer glow
- Input default border: `1px solid neutral/300`
- Input hover: `1px solid neutral/500`
- Input focused: `2px solid primary/600`

### 5.3 Shadows (Effects)

| Size        | Y offset | Blur | Spread | Usage                             |
| ----------- | -------- | ---- | ------ | --------------------------------- |
| Small (`s`) | 4px      | 16px | -6px   | Cards, dropdowns, input focus     |
| Large (`l`) | 35px     | 40px | -35px  | Modals, popovers, elevated panels |

Shadow color: always `neutral/opacity/950-10%` to `neutral/opacity/950-20%`. **Never colored shadows.**

---

## 6. Iconography

### 6.1 Icon Libraries (in priority order)

1. **MingCute** — primary library, broad coverage
2. **Lucide** — fallback for missing MingCute icons
3. **Solar** — alternative style when needed
4. **HugeIcons** — supplementary
5. **Tabler** — supplementary

### 6.2 Style Rules

| Context                                  | Style                        | Example                                     |
| ---------------------------------------- | ---------------------------- | ------------------------------------------- |
| Light background (white, neutral/50–200) | **Outline / Line**           | Sidebar icons, form field icons, info icons |
| Red/colored background (primary/600+)    | **Fill / Solid**             | CTA button icons, active nav pill icons     |
| Status icons                             | **Fill** with semantic color | Success ✓, Error ✗, Warning ⚠              |
| Feature/marketing icons                  | **Duotone** or **Fill**      | Feature cards on landing                    |

### 6.3 Icon Sizes

| Token            | Size  | Usage                              |
| ---------------- | ----- | ---------------------------------- |
| `icon-sizes/2xs` | 14px  | Inline with caption text           |
| `icon-sizes/xs`  | 16px  | Inline with paragraph-s            |
| `icon-sizes/s`   | 18px  | Inline with paragraph-l            |
| `icon-sizes/m`   | 20px  | Default UI icon (nav, form, table) |
| `icon-sizes/l`   | 24px  | Standard button icon, card header  |
| `icon-sizes/xl`  | 28px  | —                                  |
| `icon-sizes/2xl` | 32px  | Feature icons (small)              |
| `icon-sizes/3xl` | 36px  | —                                  |
| `icon-sizes/4xl` | 48px  | Feature cards, empty states        |
| `icon-sizes/5xl` | 56px  | —                                  |
| `icon-sizes/6xl` | 64px  | Modal feature icons                |
| `icon-sizes/7xl` | 72px  | Large empty state illustrations    |
| `icon-sizes/8xl` | 96px  | —                                  |
| `icon-sizes/9xl` | 124px | Hero icons                         |

### 6.4 Icon Color

- **Default (inactive):** `neutral/600` `#A1A1B9`
- **Active / selected:** `primary/600` `#C22339`
- **On red surface:** `neutral/0` `#FFFFFF` (filled)
- **Success:** `success/600` `#48BB78`
- **Warning:** `warning/600` `#FBC02D`
- **Danger:** `danger/600` `#E22824`
- **Disabled:** `neutral/400` `#D2D2E1`

---

## 7. Component Patterns

### 7.1 Buttons

#### Sizes

All buttons use **Poppins SemiBold**, border-radius **12px**, and come in text+icon and icon-only (square) versions.

| Size | Height | H-padding (text) | Font size | Icon size | Icon-only (square) |
| ---- | ------ | ---------------- | --------- | --------- | ------------------ |
| XS   | 36px   | 12px             | 13px      | 16px      | 36×36px            |
| S    | 40px   | 16px             | 14px      | 16px      | 40×40px            |
| M    | 48px   | 20px             | 15px      | 18px      | 48×48px            |
| L    | 56px   | 24px             | 16px      | 20px      | 56×56px            |

Gap between icon and label: 8px.

---

#### Variants

**Primary**

- Background: `#C22339` (primary/600)
- Text + icon: `#FFFFFF`
- Style B (Glow): same as default + drop shadow projected downward — color `#C22339` at ~25–30% opacity, Y offset 6–8px, blur 16–20px, spread -4px. The glow is subtle, visible but not aggressive.

**Secondary**

- Background: transparent
- Border: `1px solid #D2D2E1` (neutral/400)
- Text + icon: `#55556C` (neutral/800)
- Style B (Red text): same border, text and icon become `#C22339` (primary/600)

**Tertiary**

- Background: transparent
- Border: none
- Text + icon: `#55556C` (neutral/800)
- Style B (Red text): text and icon become `#C22339` (primary/600)

---

#### States (all variants)

| State        | Primary                                                                                                     | Secondary / Tertiary                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Default**  | `#C22339` bg                                                                                                | As defined above                                                                                                    |
| **Hover**    | `#CF4758` bg (primary/400)                                                                                  | `#F3F3F9` bg (neutral/100) tint                                                                                     |
| **Focus**    | `#C22339` bg + 2px ring `#C22339` at 30% opacity outside                                                    | 2px ring `#C22339` at 30% opacity outside                                                                           |
| **Pressed**  | `#8F1A31` bg (primary/800), scale 0.98                                                                      | `#ECECF4` bg (neutral/200), scale 0.98                                                                              |
| **Disabled** | `#ECECF4` bg, `#BDBDD1` text/icon, no shadow                                                                | `#D2D2E1` border, `#BDBDD1` text/icon                                                                               |
| **Loading**  | Circular spinner replaces icon or center; on red bg: white circle stroke + small black arc segment rotating | On white bg: `#D2D2E1` circle stroke + small `#C22339` arc segment rotating. Animation: 1s linear infinite rotation |

Loading spinner specs:

- Diameter: matches icon size of the button size
- Stroke width: 2px
- Base circle: `neutral/400` (`#D2D2E1`) on light bg / `rgba(255,255,255,0.3)` on red bg
- Moving arc: ~25% of circumference, `#C22339` on light bg / `#000000` on red bg
- Duration: 1s linear infinite

---

#### Icon-only buttons

Same height and border-radius. Width = height (square). All same variants and states apply. Must always have an `aria-label`.

---

#### Tooltip

Appears when user hovers a button for **more than 2 seconds**.

- Background: `#000000`
- Text: `#FFFFFF`, Poppins Regular, 12px
- Padding: 6px 10px
- Border-radius: 6px
- Position: above the button, centered, 8px gap
- Arrow: small 4px triangle pointing down, black
- Animation: fade in 150ms ease-out
- This is a standalone reusable component — used across the kit, not only on buttons.

> **Never use more than one Primary button per section.** Use Secondary or Tertiary for supporting actions.

### 7.2 Input Fields

- Height: 48px (S), 56px (M default)
- Border: `1px solid neutral/300`
- Border-radius: `corner-radius/xs` (8px) to `corner-radius/s` (12px)
- Background: `neutral/0` or `neutral/100`
- Placeholder: `neutral/500`
- Label: `paragraph-s` Medium, `neutral/800`, above input
- Focus: border becomes `primary/600` 2px, shadow `s`
- Error: border `danger/600`, helper text `danger/600` below
- Left icon: `neutral/600` outline, 20px
- Clear/right icon: `neutral/500`

### 7.3 Cards

**Standard Card**

- Background: `neutral/0`
- Border: `1px solid neutral/200`
- Border-radius: `corner-radius/m` (16px) or `corner-radius/l` (24px)
- Padding: 24px–32px
- Shadow: small (`s`) on hover

**Feature Card (like IA landing cards)**

- Border-radius: `corner-radius/l` (24px)
- Left-border accent: 3px `primary/600` (optional)
- Icon: 32–48px, colored by feature type
- Has hover state with subtle shadow lift

**Freight Listing Row (Bolsa de Cargas)**

- Height: ~72px
- Background: `neutral/0`
- Border: `1px solid neutral/200` bottom only (table-like)
- Hover: `neutral/50` background
- "Destacado" badge: `tertiary/600` orange, top-left corner, `caption` uppercase

### 7.4 Navigation — Sidebar

**Expanded state (~210px wide):**

- Background: `neutral/0`
- Right border: `1px solid neutral/200`
- Logo area: top, ~64px height
- Nav groups: collapsible, group label in `caption` uppercase `neutral/600`
- Nav item height: 40px, `paragraph-s` Medium, `neutral/700`
- Active item: `primary/0` background `#FBE1E1`, text + icon `primary/600`
- Hover: `neutral/100` background
- Sub-items: 12px left indent, same sizing
- Bottom: "Cerrar Menú" toggle

**Collapsed state (~60px wide):**

- Icons only, 24px, centered
- Active: `primary/600` icon, `primary/opacity/600-10%` background pill

### 7.5 Breadcrumbs

- Font: `paragraph-s` Regular
- Separator: `›` or `>` in `neutral/400`
- Current page: `neutral/900` Medium
- Previous levels: `neutral/600`, hover underline `primary/600`
- Icon: 16px home icon as first element

### 7.6 Badges & Tags

| Type         | Background             | Text          | Border-radius |
| ------------ | ---------------------- | ------------- | ------------- |
| Default      | `neutral/100`          | `neutral/700` | 4px           |
| Primary      | `primary/0`            | `primary/800` | 4px           |
| Success      | `success/0`            | `success/700` | 4px           |
| Warning      | `warning/0`            | `warning/800` | 4px           |
| Danger       | `danger/0`             | `danger/700`  | 4px           |
| "Destacado"  | `warning/500` / orange | `neutral/950` | 4px           |
| Count/number | `primary/600`          | `neutral/0`   | full round    |

Font: `caption` (12px) SemiBold, uppercase, `letter-spacing: 1px`.

### 7.7 Step Indicator (Stepper)

Used in multi-step modals/flows (e.g. CSV upload flow).

- Step circle: 32px diameter
- Active: `primary/600` fill, white text/number
- Completed: `primary/600` fill, white checkmark icon
- Upcoming: `neutral/300` fill or border, `neutral/600` text
- Connector line: `neutral/300` (pending) → `primary/600` (completed)
- Label: `caption` below circle, `neutral/600` inactive, `primary/600` active

### 7.8 Progress Bar

- Track: `neutral/200`, height 6–8px, `corner-radius/2xl`
- Fill: `primary/600` gradient (can use `primary/400` → `primary/600`)
- Percentage text: `paragraph-s` SemiBold, `primary/600`, above bar
- Status labels below: icon + `caption`, `success/600` for completed steps

### 7.9 Modals / Dialogs

- Max-width: ~400px (small), ~560px (medium), ~760px (large)
- Background: `neutral/0`
- Border-radius: `corner-radius/xl` (32px)
- Padding: 32px
- Backdrop: `neutral/opacity/950-50%`
- Header: icon (32–48px) + title `title-h6` (24px) SemiBold
- Close button: top-right, `neutral/600` × icon, hover `neutral/900`
- Shadow: large (`l`)

### 7.10 Data Tables / Freight Lists

- Header row: `neutral/50` background, `caption` uppercase SemiBold, `neutral/600`
- Body rows: `neutral/0` background, `paragraph-s` Regular, `neutral/800`
- Row height: 64–72px
- Alternating rows: `neutral/50` on even (optional)
- Hover: `neutral/50` background
- Action column: right-aligned, icon buttons + primary CTA
- Price display: highlighted in box with `primary/600` border or background pill

### 7.11 Map Integration

- Map always appears in a card with `corner-radius/l` (24px) clipping
- Custom pin markers: use `primary/600` red pins
- Map is a supporting element — never full-page unless on a dedicated map view

### 7.12 AI Chat Bar (Bottom persistent)

- Position: fixed bottom, centered, ~540px wide
- Background: `neutral/0`, `corner-radius/2xl` (48px pill shape)
- Border: `1px solid neutral/200`
- Shadow: small (`s`)
- Left: Powerload star icon (brand icon, 24px)
- Placeholder: `neutral/500`, `paragraph-l`
- Right: attachment icon + mic icon + send button (`primary/600` background, arrow icon fill white)

---

## 8. Layout Patterns

### 8.1 Main App Layout

```
┌─────────────────────────────────────────────────┐
│  TOPBAR (64px height)                           │
│  Logo | Breadcrumb          Notifications | User │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│ SIDEBAR  │  MAIN CONTENT AREA                   │
│ ~210px   │  padding: 48px 70px                  │
│          │  max-width: 1440px                    │
│          │                                       │
│          │                                       │
├──────────┴──────────────────────────────────────┤
│  AI CHAT BAR (fixed, bottom-center)              │
└─────────────────────────────────────────────────┘
```

### 8.2 Page Background

The main content area uses a **subtle background texture** — a faint image of shipping containers or logistics imagery at very low opacity (5–8%), overlaid on `neutral/50`. This adds depth and context without distracting from content. Cards sit on top as `neutral/0` surfaces.

### 8.3 Content Grid

- 1 column: full-width panels (maps, tables)
- 2 columns: 50/50 or 60/40 splits
- 3 columns: feature cards, stat cards (equal width, min 328px each)
- Gap: `horizontal-gap` 48px between columns

---

## 9. States & Feedback

### 9.1 Interactive States

| State          | Visual Treatment                                                        |
| -------------- | ----------------------------------------------------------------------- |
| Default        | Base styles as defined per component                                    |
| Hover          | Subtle background tint or shadow lift; color shift                      |
| Focus          | `2px solid primary/600` ring + `primary/opacity/600-20%` outer glow     |
| Active/Pressed | Scale 0.98, darken by one shade                                         |
| Disabled       | `neutral/200` bg, `neutral/400` text/icons, `cursor: not-allowed`       |
| Loading        | Skeleton shimmer using `neutral/100` → `neutral/200` gradient animation |
| Selected       | `primary/opacity/600-10%` bg, `primary/600` border/icon/text            |

### 9.2 Verification / Trust Badges

- "Transportista Verificado": small green checkmark circle icon (`success/600`) + text `caption` `success/700`
- Used on carrier cards and listings

### 9.3 Empty States

- Centered in content area
- Large icon: 64–96px, `neutral/400`
- Title: `title-h6` (24px), `neutral/800`
- Description: `paragraph-l`, `neutral/600`
- CTA: Primary button below

---

## 10. Motion & Animation

Keep animations **functional and fast** — this is a professional tool, not a marketing site.

| Animation               | Duration | Easing            | Usage                           |
| ----------------------- | -------- | ----------------- | ------------------------------- |
| Sidebar expand/collapse | 200ms    | `ease-in-out`     | Sidebar toggle                  |
| Modal open              | 150ms    | `ease-out`        | Scale 0.96→1, opacity 0→1       |
| Modal close             | 100ms    | `ease-in`         | Scale 1→0.96, opacity 1→0       |
| Dropdown open           | 150ms    | `ease-out`        | translateY(-4px)→0, opacity 0→1 |
| Progress bar fill       | 600ms    | `ease-in-out`     | Step 2 of CSV upload            |
| Hover shadow            | 150ms    | `ease`            | Card lift                       |
| Page transition         | 200ms    | `ease`            | Fade between pages              |
| Skeleton shimmer        | 1.5s     | `linear` infinite | Loading states                  |

**Rules:**

- No bounce or spring animations in production UI.
- No animations longer than 500ms for UI interactions.
- Looping animations only for loading states.
- `prefers-reduced-motion`: disable all non-essential animations.

---

## 11. Writing & Content Style

- **Language:** Spanish (es-ES). Formal _usted_ in system messages, informal _tú_ in onboarding/AI assistant.
- **Tone:** Direct, professional, action-oriented.
- **CTAs:** Verb-first, specific — "Publicar Carga", "Buscar en la Bolsa", "Ofertar Carga".
- **Labels:** Title Case for nav items and section headers. Sentence case for body and helper text.
- **Numbers:** European format — period as thousands separator, comma as decimal (e.g. `1.500,00 €`).
- **Currency:** Always `€` with value. Price/km displayed as `X.XX €/km`.
- **Dates:** `DD/MM/YY` in compact contexts, `DD de MMMM YYYY` in full.
- **AI references:** "IA" (not "AI") throughout the platform.

---

## 12. Accessibility

- **Minimum contrast:** 4.5:1 for body text, 3:1 for large text (18px+ bold).
- `primary/600` on white: ✅ passes AA for large text; always verify at body sizes.
- **Focus visible:** Never suppress `outline`. Use custom 2px red ring.
- **Touch targets:** Minimum 44×44px for all interactive elements.
- **Icon-only buttons:** Always include `aria-label` or `title`.
- **Color-only communication:** Always pair color with icon or text (e.g. error states).
- **Form labels:** Always explicit `<label>` elements, never placeholder-only.

---

## 13. Do's and Don'ts

### ✅ Do

- Use red as the single call-to-action color per view
- Use outline icons on light backgrounds
- Use fill icons on red/colored backgrounds
- Keep backgrounds white or near-white
- Use Poppins SemiBold for all headings
- Pair red brand highlights with neutral surroundings for maximum impact
- Use `neutral/200` borders for card separation
- Show progress with the 3-step stepper for multi-step flows

### ❌ Don't

- Use dark backgrounds or dark mode
- Use multiple red CTAs in the same view
- Use colored shadows
- Use Inter, Roboto, or system-ui fonts
- Use decorative gradients on cards
- Use red text on red backgrounds
- Reduce icon opacity to create "disabled" appearance (use `neutral/400` color instead)
- Use font sizes below 12px in any UI element
- Use animations longer than 500ms for interactions
- Use the quaternary (pink) or tertiary (orange) palette for brand moments — only for categorical differentiation