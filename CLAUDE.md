# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Sande Events - Balloon Decorations Website

A modern, responsive single-page website for Sande Events, a professional balloon decoration service for children's parties (birthdays, baby showers, christenings, confirmations, corporate events).

**Tech Stack:**
- **Next.js 16** (App Router) - SSR/SSG framework
- **TypeScript 5** - Type safety
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Component library (new-york style, RSC-enabled)
- **Framer Motion** - Animations
- **react-intersection-observer** - Scroll animations
- **Google Fonts** - Fredoka (display), Quicksand (body), Righteous (accent)

---

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## Project Architecture

### One-Page Structure

This is a **single-page application** with all sections on one page. The main page (`app/page.tsx`) composes all section components vertically with smooth scroll navigation.

**Section flow:** Hero → About → Services (Motywy) → Offerings (Pakiety) → Gallery → Contact → Footer

### Component Organization

```
components/
├── sections/        # Page sections (composed in app/page.tsx)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Offerings.tsx
│   ├── Gallery.tsx
│   └── Contact.tsx
├── common/          # Shared layout components
│   ├── Navigation.tsx
│   └── Footer.tsx
└── ui/              # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── textarea.tsx
```

### Font System

Three custom Google Fonts are configured in `app/layout.tsx`:

- **Fredoka** (`--font-display`) - Display font, playful, rounded
- **Quicksand** (`--font-body`) - Body text, readable but friendly
- **Righteous** (`--font-accent`) - CTAs, bold and impactful

Apply via Tailwind utility classes: `font-display`, `font-body`, `font-accent`

### Color System

Brand colors defined in `app/globals.css`:

```css
--color-sande-primary: #FF6B9D;    /* Hot Pink */
--color-sande-secondary: #4ECDC4;  /* Teal */
--color-sande-accent: #FFE66D;     /* Gold */
--color-sande-purple: #A855F7;
--color-sande-blue: #3B82F6;
```

Use these for gradients: `bg-gradient-to-r from-pink-500 to-purple-500`

### Animation Patterns

**Framer Motion** is used throughout for smooth animations. Reusable presets in `lib/utils.ts`:
- `fadeInUp` - Fade in from bottom
- `scaleIn` - Scale from 0.9
- `staggerContainer` - Stagger children animations

**Custom CSS animations** in `app/globals.css`:
- `.animate-float` - Floating upward motion
- `.animate-float-reverse` - Reverse float
- `.animate-sparkle` - Sparkle effect
- `.animate-gradient` - Shifting gradient background
- `.animate-balloon` - Wobbling balloon motion

### Navigation Pattern

The `Navigation` component uses smooth scroll to section IDs:
```tsx
onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
```

Or use utility from `lib/utils.ts`:
```tsx
import { scrollToSection } from "@/lib/utils";
scrollToSection("gallery");
```

---

## Key Patterns & Conventions

### Client vs Server Components

- **Section components** (Hero, About, etc.) are `"use client"` for Framer Motion animations
- **Layout** (`app/layout.tsx`) is a Server Component for fonts/metadata
- **UI components** from shadcn/ui can be used in both

### Animation Syntax

Framer Motion components with declarative animations:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

Infinite animations:
```tsx
animate={{
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3],
}}
transition={{
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut",
}}
```

### Button Variants

shadcn/ui Button with CVA (Class Variance Authority):
```tsx
<Button variant="default" size="lg">Primary</Button>
<Button variant="outline" size="sm">Outline</Button>
```

Custom gradients on buttons:
```tsx
<Button className="bg-gradient-to-r from-pink-500 to-purple-500">
  Gradient Button
</Button>
```

### TypeScript Paths

The `@/*` alias is configured in `tsconfig.json`:
```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

---

## Adding New Sections

1. Create component in `components/sections/NewSection.tsx`
2. Add `"use client"` directive if using animations/interactivity
3. Export as default: `export default function NewSection()`
4. Import and add to `app/page.tsx` in desired position
5. Add navigation link in `components/common/Navigation.tsx` navItems array

### Section Template

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

export default function NewSection() {
  return (
    <section id="new-section" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp}>
          {/* Content */}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Environment Variables

Optional (not currently used but reserved for future):
```env
NEXT_PUBLIC_CONTACT_EMAIL=kontakt@sandeevents.pl
NEXT_PUBLIC_CONTACT_PHONE=+48123456789
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/sandeevents
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/sandeevents
```

---

## Deployment

**Recommended: Vercel**

1. Push code to GitHub
2. Import project to Vercel
3. Auto-deploy on push to main branch

The project is Next.js-native and requires zero configuration for Vercel deployment.

---

## Common Gotchas

1. **Tailwind v4**: Using new Tailwind v4 syntax with `@import "tailwindcss"` and `@theme inline` blocks
2. **shadcn/ui new-york style**: Components use the new-york variant with specific styling patterns
3. **Font variables**: Always include font variables in className: `${font.variable} font-body`
4. **Smooth scroll**: Both CSS (`html { scroll-behavior: smooth; }`) and JS scroll methods are used
5. **Section IDs**: Navigation relies on `id` attributes on section elements for scroll-to functionality
6. **Mobile menu**: Implemented as conditional render with AnimatePresence-like pattern (motion div with exit prop)
