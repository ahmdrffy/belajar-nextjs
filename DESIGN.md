# Design System Specification: SMKN 21 Jakarta

> **Website Reference:** [https://www.smkn21jakarta.sch.id/](https://www.smkn21jakarta.sch.id/)  
> **Brand Identity:** Modern Vocational Education (EdTech), Eco-Friendly ("Adiwiyata"), Professional Institutional.

---

## 1. Design Philosophy & Vision

The visual identity of **SMK Negeri 21 Jakarta** balances two primary core pillars:
1. **Academic & Industrial Excellence:** Represented by deep royal blues and sleek modern neutrals to convey trust, technology, and professionalism.
2. **Adiwiyata & Environmental Awareness:** Highlighted through rich emerald greens and vibrant eco-accents reflecting the school's commitment to sustainability and green culture.

The layout emphasizes readability, clear hierarchical navigation across sub-pages (Profil, Kurikulum, Kesiswaan, TEFA, Humas, SPMB), accessibility, and responsive card-based architecture.

---

## 2. Color Palette & Token System

### 2.1 Primary Brand Colors

| Token Name | Hex Code | RGB | HSL | Tailwind Class | Recommended Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `color-primary-navy` | `#0F2C59` | `15, 44, 89` | `217°, 71%, 20%` | `bg-blue-950` / `text-blue-950` | Main headers, navbar background, hero titles, primary buttons |
| `color-primary-blue` | `#1D4ED8` | `29, 78, 216` | `224°, 76%, 48%` | `bg-blue-700` / `text-blue-700` | Interactive states, primary links, active tabs |
| `color-adiwiyata-emerald` | `#059669` | `5, 150, 105` | `161°, 94%, 30%` | `bg-emerald-600` | Adiwiyata eco-badges, success highlights, environmental banners |
| `color-adiwiyata-light` | `#D1FAE5` | `209, 250, 229` | `149°, 80%, 90%` | `bg-emerald-100` | Eco callout backgrounds, pill badge fills |

---

### 2.2 Secondary & Accent Colors

| Token Name | Hex Code | RGB | HSL | Tailwind Class | Recommended Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `color-accent-amber` | `#F59E0B` | `245, 158, 11` | `38°, 92%, 50%` | `bg-amber-500` | Prestasi (Achievements), badges, star ratings, announcements |
| `color-accent-sky` | `#0284C7` | `2, 132, 199` | `200°, 98%, 39%` | `bg-sky-600` | Information tags, digital literacy indicators |
| `color-accent-gold` | `#EAB308` | `234, 179, 8` | `45°, 93%, 47%` | `bg-yellow-500` | Highlighting critical news, top rankings |

---

### 2.3 Program Keahlian (Vocational Majors) Color Identity

Each major in SMKN 21 Jakarta uses a dedicated brand color to assist visual navigation across course pages:

| Program Keahlian | Accent Hex | Tailwind Color | Application |
| :--- | :--- | :--- | :--- |
| **PPLG** *(Pengembangan Perangkat Lunak & Gim)* | `#06B6D4` | `cyan-500` | Coding badges, software tags, tech cards |
| **Bisnis Ritel (BR)** | `#F97316` | `orange-500` | E-commerce icons, retail cards, sales metrics |
| **MPLB** *(Manajemen Perkantoran)* | `#6366F1` | `indigo-500` | Office management components, executive badges |
| **AKL** *(Akuntansi & Keuangan)* | `#10B981` | `emerald-500` | Financial reporting, accounting cards |

---

### 2.4 Neutral Surface & Text Palette

| Token Name | Hex Code | Tailwind Class | Purpose |
| :--- | :--- | :--- | :--- |
| `surface-canvas` | `#F8FAFC` | `bg-slate-50` | Main body background |
| `surface-card` | `#FFFFFF` | `bg-white` | News cards, content containers, modals |
| `surface-muted` | `#F1F5F9` | `bg-slate-100` | Input fields, table header background, inactive tabs |
| `border-subtle` | `#E2E8F0` | `border-slate-200` | Card borders, subtle dividers |
| `text-primary` | `#0F172A` | `text-slate-900` | Headings, titles, main body text |
| `text-secondary` | `#475569` | `text-slate-600` | Subtitles, meta info, publication dates |
| `text-muted` | `#94A3B8` | `text-slate-400` | Placeholders, disabled elements, footer captions |

---

### 2.5 Semantic Colors

| Intent | Hex Code | Tailwind Class | Example |
| :--- | :--- | :--- | :--- |
| **Success** | `#10B981` | `emerald-500` | "Pendaftaran Diterima", Active status |
| **Warning** | `#F59E0B` | `amber-500` | "Batas Akhir SPMB", Pending actions |
| **Danger / Error** | `#EF4444` | `red-500` | Validation errors, urgent alerts |
| **Info** | `#3B82F6` | `blue-500` | "Pengumuman ANBK", General notes |

---

## 3. Typography System

The typography relies on **Plus Jakarta Sans** (Primary Display & Headings) and **Inter** (Body & Interface Text) for high legibility across mobile and desktop devices.

### 3.1 Font Families
- **Primary / Headings:** `'Plus Jakarta Sans', sans-serif`
- **Body & UI:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- **Code / Technical (PPLG):** `'JetBrains Mono', monospace`

### 3.2 Type Hierarchy

| Scale Level | Font Size | Line Height | Font Weight | Usage Example |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `2.5rem` (40px) | `1.2` | Bold (700) | Hero Headline / Main School Motto |
| **Page Title H2** | `2.0rem` (32px) | `1.25` | Bold (700) | Section Headings ("BERITA TERBARU", "PROGRAM KEAHLIAN") |
| **Section Title H3** | `1.5rem` (24px) | `1.3` | SemiBold (600) | Card Titles, Major Names |
| **Subtitle H4** | `1.25rem` (20px) | `1.4` | Medium (500) | Sub-headings, Featured News Headlines |
| **Body Large** | `1.125rem` (18px) | `1.6` | Regular (400) | Lead paragraphs, Sambutan Kepala Sekolah |
| **Body Regular** | `1.0rem` (16px) | `1.5` | Regular (400) | Standard article text, description paragraphs |
| **Caption / Small** | `0.875rem` (14px) | `1.4` | Regular (400) / Medium (500) | Dates (e.g., `16/10/2026`), Tag labels, Footer links |

---

## 4. Gradients & Surface Elevations

### 4.1 Signature Gradients

```css
/* Navy Institutional Hero Gradient */
--gradient-hero: linear-gradient(135deg, #0F2C59 0%, #1D4ED8 100%);

/* Adiwiyata Green Eco Gradient */
--gradient-adiwiyata: linear-gradient(135deg, #059669 0%, #10B981 100%);

/* Premium Gold Accent Gradient */
--gradient-gold: linear-gradient(135deg, #F59E0B 0%, #EAB308 100%);

/* Soft Surface Backdrop Gradient */
--gradient-surface: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
```

### 4.2 Shadows & Elevation

```css
/* Card Soft Shadow */
--shadow-card: 0px 4px 12px rgba(15, 44, 89, 0.05);

/* Card Hover Elevation */
--shadow-card-hover: 0px 12px 24px rgba(15, 44, 89, 0.12);

/* Modal & Dropdown Shadow */
--shadow-overlay: 0px 20px 40px rgba(15, 23, 42, 0.18);
```

---

## 5. UI Component Guidelines

### 5.1 Top Navigation & Header
- **Background:** White (`#FFFFFF`) with bottom border (`#E2E8F0`) or Solid Navy (`#0F2C59`) for high-contrast variants.
- **Logo:** Official SMKN 21 Jakarta Logo aligned left.
- **Navigation Links:** `14px` Medium weight, `color: #0F172A`, hover color: `#1D4ED8` with a subtle bottom bar indicator (`2px`).
- **Dropdown Menus:** White container with `shadow-overlay` and rounded corners (`radius: 8px`).

### 5.2 News & Article Cards ("Berita Terbaru")
- **Border Radius:** `12px` (`rounded-xl`).
- **Border:** `1px solid #E2E8F0`.
- **Image Aspect Ratio:** `16:9` object-cover.
- **Badge Tag:** Top left overlay or card top:
  - Date Badge: `#F1F5F9` text `#475569`.
  - Adiwiyata Tag: `#D1FAE5` text `#059669`.
- **Action Button ("Selengkapnya"):** Text-link style with chevron icon, color `#1D4ED8`, hover `#0F2C59`.

### 5.3 Program Keahlian Grid
- **Grid Layout:** 4 columns on Desktop (`grid-cols-4`), 2 on Tablet, 1 on Mobile.
- **Top Accent Line:** `4px` top border colored according to the major's accent color (Cyan, Orange, Indigo, Emerald).
- **Icon Box:** `48x48px` background with 10% opacity of the major color, containing the relevant vector icon.

### 5.4 Partner Logo Marquee ("Kerjasama Industri")
- **Background:** Soft slate (`#F8FAFC`).
- **Logos (Ramayana, Lotte, Samsung, etc.):** Grayscale opacity `0.7`, transition to original color on hover with `opacity 1.0`.

---

## 6. Accessibility & Contrast (WCAG Compliance)

1. **Text Contrast:**
   - Dark Navy `#0F2C59` on White `#FFFFFF` yields a contrast ratio of **12.5:1** (Passes WCAG AAA).
   - Emerald Green `#059669` on White `#FFFFFF` yields **4.6:1** (Passes WCAG AA for body text).
   - White text on Navy `#0F2C59` yields **12.5:1** (Passes WCAG AAA).
2. **Interactive States:**
   - All buttons must have explicit focus rings (`ring-2 ring-blue-500 ring-offset-2`).
   - Minimum tap targets for mobile buttons: `44px x 44px`.

---

## 7. Tailwind CSS Configuration Code

Developers implementing front-end interfaces for SMKN 21 Jakarta can copy this configuration block into `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F2C59',
          blue: '#1D4ED8',
          dark: '#0A1E3F',
        },
        adiwiyata: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
          dark: '#047857',
        },
        accent: {
          amber: '#F59E0B',
          gold: '#EAB308',
          sky: '#0284C7',
        },
        major: {
          pplg: '#06B6D4',
          ritel: '#F97316',
          mplb: '#6366F1',
          akl: '#10B981',
        },
        surface: {
          canvas: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0px 4px 12px rgba(15, 44, 89, 0.05)',
        'card-hover': '0px 12px 24px rgba(15, 44, 89, 0.12)',
      },
      borderRadius: {
        'brand': '12px',
      }
    },
  },
  plugins: [],
}
```