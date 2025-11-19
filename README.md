# Jonathan Rojas
# IS117 003

# Humanist Modernism: Readability First

A design system and digital garden dedicated to **Humanist Modernism (HM)**—a philosophy that prioritizes human readability, warmth, and accessibility over cold geometric abstraction.

This project transforms design thinking by centering the reader's comfort and cognitive experience as the primary design goal. Every decision—from typography to spacing to color—serves the principle that **design is communication, and communication requires empathy for the audience**.

---

## Project Overview

This repository documents the complete transformation from a cold, geometric Bauhaus-inspired theme to a warm, human-centered Humanist Modernism design system. The transition reflects a fundamental shift in design philosophy:

**From:** Geometric perfection, mechanical uniformity, aggressive typography (Swiss Style, Helvetica)  
**To:** Humanist warmth, empathetic typography, generous spacing, and accessibility-first design

The HM philosophy is rooted in the work of **Adrian Frutiger** (typographer) and **Edward Tufte** (information designer)—pioneers who challenged the coldness of geometric modernism by proving that clarity and warmth are not opposing forces, but complementary principles.

### Core Principle

> **Readability is not a constraint—it is the primary design goal.**

When readability is prioritized, accessibility follows naturally. When accessibility is designed for first, sighted and able users benefit equally. This is the essence of Humanist Modernism: respectful, empathetic design that serves all humans.

---

## Key Features

### 🎨 HM-Optimized Color Palette
- **Warm Neutrals**: Sage greens, warm grays, clay earth tones create approachable, human-scaled environments
- **High Contrast**: Accessible color combinations (WCAG AA/AAA compliant) that reduce eye strain during sustained reading
- **Muted Accents**: Soft primary and secondary colors that guide without aggression
- **No Aggressive Primaries**: Primary colors (red, blue, yellow) are reserved for emphasis and wayfinding, not dominant UI

### 📝 Generous, Comfortable Typography
- **Body Text Minimum 18px**: HM requires generous starting sizes (18–21px) to accommodate all readers
- **Relaxed Line Height (1.7–1.8x)**: Extra vertical space prevents eye strain and respects cognitive load
- **Humanist Sans-Serif Typefaces**: Frutiger, Avenir, FF Meta, Inter—designed with open apertures and varied stroke widths
- **Optimal Measure (60–80 CPL)**: Line length constrained to 720–800px to respect human perception limits
- **Natural Letter Spacing**: No aggressive geometric tracking; warm, open spacing that feels human-made

### 📐 Content-First Layout
- **Constrained Reading Measure**: Maximum 720px content width preserves optimal reading conditions across all screen sizes
- **Ample White Space**: Generous margins, padding, and spacing create visual rest and prevent cognitive fatigue
- **Vertical Rhythm System**: Consistent spacing between paragraphs, headings, and sections establishes a calm, predictable reading pace
- **Hierarchy Through Clarity**: Visual hierarchy achieved through typography and spacing, not aggressive decoration


#### Primary Colors (Warm Neutrals)
```css
--color-text: #2c2c2c;           /* Deep charcoal for readability */
--color-text-light: #666666;     /* Medium gray for secondary text */
--color-text-muted: #999999;     /* Light gray for tertiary text */
--color-bg: #fafafa;             /* Off-white for comfortable reading */
--color-bg-alt: #f5f5f5;         /* Slightly darker bg for contrast */
```

#### Accent Colors (Humanist Warmth)
```css
--color-primary: #4a7c6f;        /* Sage green - warm, approachable */
--color-secondary: #a89968;      /* Warm clay - earth tone accent */
--color-accent: #c9a876;         /* Soft bronze - gentle warmth */
--color-border: #e5e5e5;         /* Soft border - not harsh black */
```

#### Semantic Colors
```css
--color-success: #6b9a6f;        /* Warm green - accessible */
--color-warning: #d4a574;        /* Warm amber - not aggressive yellow */
--color-error: #a85959;          /* Muted red - not harsh red */
--color-info: #6b8fa8;           /* Soft blue - calming */
```

### Typography System

#### Font Families
```css
--font-display: 'Avenir', 'Open Sans', sans-serif;  /* Headings - humanist warmth */
--font-body: 'Inter', 'Open Sans', sans-serif;       /* Body text - open, readable */
--font-code: 'Courier New', monospace;               /* Code - clear distinction */
```

#### Font Sizes (Fluid, Responsive)
```css
/* Display (Hero Headlines) */
--font-size-display-xl: clamp(3rem, 8vw, 7rem);     /* 48px → 112px */

/* Headings (H1–H6) */
--font-size-h1: clamp(1.75rem, 4vw, 3.5rem);       /* 28px → 56px */
--font-size-h2: clamp(1.5rem, 3.5vw, 2.75rem);     /* 24px → 44px */

/* Body (HM Minimum 17px) */
--font-size-body-xl: clamp(1.25rem, 2vw, 1.375rem); /* 20px → 22px */
--font-size-body-lg: clamp(1.125rem, 1.5vw, 1.25rem); /* 18px → 20px */
--font-size-body: clamp(1.063rem, 1vw, 1.125rem);  /* 17px → 18px */
```

#### Line Heights (Generous, HM-Optimized)
```css
--line-height-display: 1.1;      /* Tight for impact */
--line-height-heading: 1.25;     /* Comfortable for headers */
--line-height-body: 1.7;         /* HM Standard: 1.7x for reading comfort */
--line-height-body-relaxed: 1.8; /* Extra generous for long-form */
--line-height-body-loose: 1.9;   /* Maximum comfort for accessibility */
```

#### Letter Spacing (Natural, Not Aggressive)
```css
--letter-spacing-display: 0;     /* Natural, warm spacing */
--letter-spacing-heading: 0;     /* No geometric tracking */
--letter-spacing-body: 0;        /* Preserve typeface design intent */
```

### Spacing System

#### Scale (Vertical Rhythm)
```css
--spacing-xs: 0.25rem;    /* 4px - micro spacing */
--spacing-sm: 0.5rem;     /* 8px - small spacing */
--spacing-md: 1rem;       /* 16px - standard spacing */
--spacing-lg: 1.5rem;     /* 24px - generous spacing */
--spacing-xl: 2rem;       /* 32px - ample spacing */
--spacing-2xl: 3rem;      /* 48px - very generous */
--spacing-3xl: 4rem;      /* 64px - hero spacing */
```

#### Responsive Padding/Margins
- **Container**: 1rem mobile → 2rem tablet → 3rem desktop
- **Sections**: clamp(2rem, 5vw, 4rem) — Scales with viewport
- **Content Margins**: Bottom margins use `var(--spacing-lg)` for consistent rhythm
- **Line Length**: Max 720px for optimal reading measure

### Border Radius (Soft, Not Aggressive)
```css
--radius-sm: 4px;        /* Subtle softness */
--radius-md: 6px;        /* Standard softness */
--radius-lg: 8px;        /* Generous softness */
--radius-full: 9999px;   /* Circular elements */
```

### Shadows (Subtle, Warm)
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.08);
```

---

## Transformation Journey: Bauhaus → Humanist Modernism

### What Changed

#### 1. **Typography**
- **Before**: Aggressive Helvetica, 16px body, 1.5x line-height, 0.1em letter-spacing
- **After**: Warm humanist sans-serif (Avenir, Inter), 17-21px body, 1.7-1.8x line-height, natural spacing

#### 2. **Color Palette**
- **Before**: Black, white, primary colors (red #ff0000, blue #0066ff)
- **After**: Warm neutrals (sage green #4a7c6f, warm clay #a89968), soft borders

#### 3. **Spacing**
- **Before**: Tight, uniform spacing; no vertical rhythm
- **After**: Generous, clamp-based fluid spacing; clear vertical rhythm

#### 4. **Animations**
- **Before**: Aggressive geometric motion (floatSlow, rotateSlow, custom cursors)
- **After**: Subtle, purposeful entrance animations; full prefers-reduced-motion support

#### 5. **Components**
- **Before**: Bauhaus utilities (.type-caps with uppercase + tracking)
- **After**: HM utilities (.type-accent with warm colors and emphasis)

#### 6. **Philosophy**
- **Before**: "Design is art; express geometric perfection"
- **After**: "Design is communication; empathy for the reader is paramount"

### Files Transformed (20+)

✅ **Typography**: `src/css/typography.css` — Generous sizes, 1.7–1.8 line-height  
✅ **Animations**: `src/css/animations.css` — Removed geometric motion, added accessibility  
✅ **Layouts**: `src/_layouts/project.njk`, `src/_layouts/post.njk` — HM spacing and typography  
✅ **Pages**: `src/history.njk`, `src/principles.njk`, `src/index.njk` — HM messaging  
✅ **Blog**: `src/blog/welcome.md` — Reframed as HM origins vs. Bauhaus history  
✅ **Components**: All buttons, cards, and UI elements — Soft borders, warm colors  

---

## Installation & Development

### Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn**
- **Eleventy** (static site generator)

### Setup
```bash
# Clone repository
git clone <repository-url>
cd bauhaus_design

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
src/
├── _layouts/          # Nunjucks templates (base, post, project)
├── _includes/         # Reusable components (header, footer, nav)
├── css/               # Global styles (typography, animations, variables)
├── blog/              # Markdown blog posts
├── index.njk          # Homepage
├── history.njk        # HM history page
├── principles.njk     # Core principles page
└── examples.njk       # Canonical examples (iA Writer, Medium, Tufte)

.eleventy.js           # Eleventy configuration
.gitignore
package.json
README.md
```
---

## Design Principles in Practice

### 1. Readability Paramount
Every page defaults to 18px+ body text with 1.7+ line-height. The measure (content width) is constrained to 720px. Users can read comfortably for extended periods without eye strain.

**Example**: Blog posts and long-form content are rendered in `container--narrow` (max 720px) with generous spacing.

### 2. Empathetic Typography
Headings use Avenir (warm, open); body uses Inter (clear, readable). No all-caps tracking. No aggressive letter-spacing. Typefaces are chosen to communicate "we respect your reading experience."

**Example**: `src/css/typography.css` uses `--letter-spacing-display: 0` and `--letter-spacing-heading: 0`

### 3. Content-First Design
Layout serves content, not the reverse. Decorative elements are removed. Colors guide attention. Spacing creates rhythm.

**Example**: `src/index.njk` removed two content summary sections; now just Hero + 3 Principles + CTA.

### 4. Accessibility as Default
- High-contrast color combinations (WCAG AA/AAA)
- `prefers-reduced-motion` support throughout
- Semantic HTML
- Proper heading hierarchy
- Alt text on all images

**Example**: `src/css/animations.css` has comprehensive `@media (prefers-reduced-motion: reduce)` rules.

### 5. Warm Over Cold
Every color, spacing decision, and interaction is evaluated: Does this feel warm and human, or cold and mechanical? Warm wins.

**Example**: Border color changed from `var(--color-primary)` (aggressive) to `var(--color-accent)` (warm).

---

## AI Collaboration & Vibe Coding

This project demonstrates **AI Vibe Coding**—using AI as a collaborative partner to apply consistent design constraints across large codebases.

### Methodology
1. **Define Constraints**: Specify exact values (18px minimum, 1.7x line-height, etc.)
2. **Document Philosophy**: Explain *why* each constraint exists (HM principles)
3. **Apply Systematically**: Use AI to apply constraints across all files (20+ files)
4. **Iterate & Refine**: Adjust constraints based on results
5. **Version & Document**: Record all changes for reproducibility

### Benefits
- **Consistency**: Design system applied uniformly across entire project
- **Scale**: Hundreds of style changes applied in hours, not days
- **Documentation**: Every decision is recorded and justified
- **Accessibility**: Constraints ensure WCAG compliance by default
- **Maintainability**: Future developers inherit clear, documented system

---

## Resources

### HM Philosophy
- **Adrian Frutiger** — *Univers* and *Frutiger* typefaces (1954–1975)
- **Edward Tufte** — *The Visual Display of Quantitative Information* (1983)
- **Matthew Butterick** — *Practical Typography* (2014)

### Web Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/)
- [Inclusive Components](https://inclusive-components.design/)

### Tools
- [Eleventy](https://www.11ty.dev/) — Static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) — Template language
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Contributing

This project welcomes contributions that advance Humanist Modernism principles:
- Improved typography and readability
- Enhanced accessibility features
- Better content structure
- Warm, empathetic design decisions

**Do not contribute**: Aggressive geometric styles, cold colors, decorative motion, or accessibility violations.

