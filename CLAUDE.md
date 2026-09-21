# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production (runs next-sitemap as postbuild)
npm run start     # Start production server
```

There is no linter set up. `npx tsc --noEmit` is the type check.

## Architecture

**Limonada** is a Next.js 15 App Router site (Portuguese, Brazil) for a boutique consultancy/events agency at `alimonada.com.br`.

### Data layer

Client cases (`cliente` post type, ACF fields) and Ponto de Vista articles (`pontoDeVista` post type) come from a headless WordPress at `https://wp.alimonada.com.br` via GraphQL (`graphql-request`). The endpoint is set with the `WP_GRAPHQL` env var. [`src/lib/wordpress/getCases.ts`](src/lib/wordpress/getCases.ts) and [`getPosts.ts`](src/lib/wordpress/getPosts.ts) map the WordPress nodes onto the shapes the pages render; responses are cached for 60 seconds. There is no static content in the repo anymore.

### Routing

Pages live under `src/app/` using App Router conventions. The canonical route list and social links are maintained in [`src/utils/routes.js`](src/utils/routes.js). Update it when adding pages.

### Styling

- CSS is written in PostCSS (`.pcss` files) under `src/assets/css/base/`, imported by [`src/assets/css/global.css`](src/assets/css/global.css).
- TailwindCSS v4 is used alongside PostCSS.
- Two local woff2 fonts in `src/assets/fonts/`, `Public Sans` and `NetworkFreeVersion`, exposed as CSS variables `--font-public-sans` and `--font-network-free`.
- A third font (Adobe Typekit) is loaded via `<link>` in the layout head.

### SVG handling

SVGs are imported as React components by default via `@svgr/webpack`. To import as a URL, append `?url` to the import. Inline SVG components live in `src/components/Svg/`.

### Animations

GSAP (with `@gsap/react`) is the primary animation library. Reusable animation wrappers live in `src/components/Utils/Animations/` (e.g. `AnimatedText`, `AnimatedTitle`, `StaggerUp`, `ScrollingImage`, `MagneticButton`, `Counter`).

### Key layout wrappers (applied globally in `src/app/layout.tsx`)

- `SmoothScroller`: wraps all page content for smooth scroll behavior
- `ViewportHeight`: sets the `--vh` CSS variable for the mobile viewport fix
- `PreloadLemonImages`: warms the browser cache for the lemon animation images
- `GtmPageView`, `GtmScrollDepth`, `GtmUtmCapture`: Google Tag Manager tracking
- `Guidelines`: dev-only grid overlay
- `#portal` div: target for the `Portal` component used by the form modals

### Case pages

Case pages (`/clientes/[postId]`) are built from section components next to the route in `src/app/clientes/[postId]/` (`BannerTop`, `FourBlocks`, `Numbers`, `Testimonials`, `RelatedClients`). Section headings default to `defaultSectionTitles` in `getCases.ts` and can be overridden per case in WordPress.

### Email

Contact form submissions are handled by `src/app/api/resend/route.ts` using the Resend SDK. Requires `RESEND_API_KEY` env var.

### Image optimization

`next/image` remote patterns allow `wp.alimonada.com.br` (WordPress media). Preferred formats are AVIF and WebP. WordPress uploads are also proxied at `/uploads/*` so client logos, used as CSS masks, load from the site's own origin. The path can't start with `/wp-`: a Vercel firewall rule blocks those to stop WordPress scanners.
