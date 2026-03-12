# AGENTS.md — Velour Studio

Agent-oriented reference for the `velour-studio` Next.js codebase.
All commands must be run from the `velour-studio/` directory.

---

## Project Overview

Velour Studio is a **Next.js 16 App Router** e-commerce site for a slow-fashion brand.
Stack: React 19, Tailwind CSS v4, NextAuth.js, bcryptjs.
No database — products are mocked in `app/lib/productos.js`; cart and admin data persist in `localStorage`.
All text and variable names are in **Spanish** (Colombian locale).

---

## Build, Dev, and Lint Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server (requires build first)
npm run start

# Lint the entire project
npm run lint
```

**There are no test files or test runner configured.**
If adding tests, use Vitest or Jest with `@testing-library/react`. Do not add a test runner
unless explicitly requested.

---

## Environment Variables

Copy `.env.local` and fill in values before running locally.
Required variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-secret>
NEXT_PUBLIC_WHATSAPP_NUMBER=573001234567
NEXT_PUBLIC_N8N_WEBHOOK_LISTA_ESPERA=<url>
NEXT_PUBLIC_N8N_WEBHOOK_AGENDAR_VISITA=<url>
NEXT_PUBLIC_BUSINESS_NAME=Velour Studio
NEXT_PUBLIC_BUSINESS_ADDRESS=Laureles, Medellín
NEXT_PUBLIC_BUSINESS_EMAIL=hola@velour.studio
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/velour.studio.med
```

`NEXT_PUBLIC_*` variables are safe to expose to the browser.
Variables without the prefix are server-only.

---

## Project Structure

```
velour-studio/
├── app/
│   ├── layout.js               # Root layout — wraps AuthProvider, CartProvider
│   ├── globals.css             # Tailwind v4 @theme tokens + global styles
│   ├── components/             # Shared UI (Header, Footer, FilterBar, etc.)
│   ├── context/
│   │   └── CartContext.jsx     # Cart state — React Context + localStorage
│   ├── lib/
│   │   ├── productos.js        # Mock product data (30 products)
│   │   ├── utils.js            # Pure utility functions (formatting, validation)
│   │   └── whatsapp.js         # WhatsApp message helpers
│   ├── data/
│   │   └── lineas.js           # 4 product lines definition
│   ├── api/
│   │   ├── agendar-visita/route.js   # POST → n8n webhook
│   │   ├── lista-espera/route.js     # POST → n8n webhook
│   │   └── auth/[...nextauth]/route.js
│   ├── catalogo/               # Catalog page with filters
│   ├── producto/[id]/          # Dynamic product pages
│   ├── velour-edit/            # Limited-edition landing
│   ├── sobre-valentina/        # Founder storytelling page
│   ├── contacto/               # Visit booking form
│   ├── checkout/               # Checkout flow
│   ├── gracias/                # Post-purchase confirmation
│   └── admin/                  # Admin panel (NextAuth protected)
├── public/
├── next.config.mjs
├── eslint.config.mjs
├── postcss.config.mjs
└── jsconfig.json               # Path alias: @/* → root
```

---

## Code Style Guidelines

### Language and Locale
- **All user-facing text, variable names, function names, and comments are in Spanish.**
- Locale is `es-CO`. Dates and currency use Colombian formatting.
- Use `toLocaleString('es-CO')` for prices. Currency symbol is `$` (COP), not USD.

### File Extensions
- Pages and layouts: `.js`
- Components with JSX: `.jsx`
- Config files: `.mjs`
- No TypeScript — the project is plain JavaScript.

### Imports
- Use the `@/` alias for absolute imports from the project root: `import { useCart } from "@/app/context/CartContext"`.
- Next.js built-ins come first, then React, then internal modules, then relative paths.
- Do not use barrel/index files. Import directly from the source file.
- External images are allowed from `images.unsplash.com` and `placehold.co` (configured in `next.config.mjs`).

### React Components
- All client components must have `"use client"` as the **first line** of the file.
- Server components have no directive (default in App Router).
- Use `export default function ComponentName()` for pages and layouts.
- Use named exports for shared components when a file exports multiple items.
- Component file names use **PascalCase**: `ProductCard.jsx`, `CartDrawer.jsx`.

### Naming Conventions
- **Components / pages**: PascalCase — `ProductGallery`, `FilterBar`
- **Functions and variables**: camelCase in Spanish — `formatearPrecio`, `menuAbierto`, `getCartCount`
- **Constants**: camelCase or ALL_CAPS for truly static config — `NEXTAUTH_SECRET`
- **CSS custom properties**: kebab-case with `velour-` prefix — `--velour-burgundy`
- **Tailwind classes**: use brand tokens like `text-velour-black`, `bg-velour-cream`
- **Route files**: lowercase kebab-case directories — `agendar-visita/route.js`

### Styling
- Use **Tailwind CSS v4** utility classes exclusively. No inline styles, no CSS Modules.
- Brand colors are defined as `@theme` tokens in `app/globals.css` and are available as Tailwind classes: `velour-cream`, `velour-beige`, `velour-taupe`, `velour-charcoal`, `velour-black`, `velour-burgundy`, `velour-forest`.
- No `tailwind.config.js` — theme customization lives in `globals.css` under `@theme inline`.
- Neutral scale: use `neutral-50` through `neutral-900` (mapped to CSS variables).
- Responsive breakpoints: mobile-first (`sm:`, `md:`, `lg:`).

### State Management
- Local UI state: `useState`.
- Shared cart state: `CartContext` — always consume via `useCart()` hook.
- Persist cart to `localStorage` under key `velour-cart`.
- Wrap `localStorage` access in `typeof window !== "undefined"` checks to avoid SSR errors.
- Use `startTransition` for non-urgent state updates (hydration, localStorage reads).

### API Routes
- Located in `app/api/*/route.js`. Use named exports `GET`, `POST`, `OPTIONS`, etc.
- Validate all required fields before processing. Return 400 with `{ error: "..." }` on failure.
- Wrap route handlers in `try/catch`. Return 500 with `{ error: 'Error interno del servidor' }` on unexpected errors.
- Use `NextResponse.json()` for all responses.
- Return success responses as `{ success: true, mensaje: "...", data: {...} }`.

### Error Handling
- API routes: always `try/catch`, log with `console.error('Error en /api/ruta:', error)`.
- Client-side `localStorage`: always wrap in `try/catch` (throws in private/incognito mode).
- Webhook failures (n8n): log the error but **do not block the user response** — degrade gracefully.
- Custom hooks: throw a descriptive Spanish error if used outside their provider:
  `throw new Error("useCart debe usarse dentro de un CartProvider")`.

### Utility Functions
- Pure functions live in `app/lib/utils.js` with JSDoc comments.
- Each function should have `@param` and `@returns` annotations.
- WhatsApp helpers live in `app/lib/whatsapp.js`.
- Use `cn(...classes)` from `utils.js` to conditionally combine Tailwind class strings.

### Performance (from Vercel React Best Practices skill)
- Parallelize independent `async` operations with `Promise.all()` — avoid sequential `await` chains.
- Use `<Suspense>` boundaries so layout renders before data loads.
- Prefer functional `setState(prev => ...)` updates to avoid stale closures.
- Derive values during render instead of storing them in `useEffect` + `useState`.
- Use `useMemo` only for genuinely expensive computations, not primitive derivations.
- Do NOT use `useMemo` to wrap simple boolean/string/number expressions.

### Authentication (Admin)
- Admin panel at `/admin` is protected by NextAuth.js with JWT sessions.
- Passwords are hashed with `bcryptjs`.
- Server Actions (if added) must verify the session internally — do not rely on layout guards alone.

### SEO and Metadata
- Each page exports a `metadata` object or `generateMetadata` function.
- Root metadata is in `app/layout.js`. Page-level metadata overrides it via the `template` pattern: `'%s | Velour Studio'`.
- `app/sitemap.js` generates `sitemap.xml` automatically.
- Always include `aria-label` on icon-only buttons.

---

## Key Patterns to Follow

```js
// Client component
"use client";
import { useState } from "react";

export default function MiComponente({ titulo }) {
  const [abierto, setAbierto] = useState(false);
  return <div>{titulo}</div>;
}
```

```js
// API route with validation and n8n webhook
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { campo } = body;
    if (!campo) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }
    // ... webhook call, degrade gracefully on failure
    return NextResponse.json({ success: true, mensaje: 'Operación exitosa' });
  } catch (error) {
    console.error('Error en /api/mi-ruta:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
```

```js
// Utility function with JSDoc
/**
 * Descripción de la función
 * @param {string} texto - Descripción del parámetro
 * @returns {string} Descripción del retorno
 */
export const miFuncion = (texto) => {
  if (!texto) return '';
  return texto.trim();
};
```
