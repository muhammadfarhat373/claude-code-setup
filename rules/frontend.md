---
paths:
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.vue"
  - "**/*.svelte"
  - "**/*.component.ts"
  - "**/*.component.html"
  - "**/*.css"
  - "**/*.scss"
  - "**/components/**"
  - "**/pages/**"
  - "**/app/**"
  - "**/hooks/**"
  - "**/composables/**"
  - "**/stores/**"
---
# Frontend rules (React, Next.js, Vue, Nuxt, Angular, Svelte, and others)

First check package.json to see which framework and version the project uses.
Follow that framework's official patterns and the project's existing style.

## All frameworks
- Small, reusable components with one job. Keep business logic out of UI components.
- Type all props, events, and API responses.
- Handle all UI states: loading, error, empty, and success.
- Use the project's existing data fetching and state tools. Do not add a new one without asking.
- Keep server state (API data) separate from UI state (modals, tabs).
- Never put secrets in frontend code. Anything in the browser is public.
- Sanitize any HTML from users before rendering it (avoid XSS).

## React
- Function components and hooks only.
- Follow the Rules of Hooks. Correct dependency arrays in useEffect, useMemo, useCallback.
- Do not use useEffect for things that can be calculated during render.
- Stable, unique `key` props (not array index for lists that change).
- Use memo, useMemo, useCallback only when they really prevent costly re-renders.
- Prefer TanStack Query, SWR, or the project's tool for server data instead of manual fetch in useEffect.

## Next.js
- Check if the project uses App Router or Pages Router, and follow that one.
- App Router: Server Components by default; add "use client" only when needed (state, effects, browser APIs).
- Fetch data on the server when possible. Use the correct caching and revalidation.
- Use next/image, next/link, and next/font. Use the Metadata API for SEO.

## Vue and Nuxt
- Composition API with `<script setup lang="ts">`.
- Use `computed` for derived values, not watchers.
- Pinia for shared state. Composables for reusable logic.
- Nuxt: useFetch/useAsyncData for data, useHead/useSeoMeta for SEO.

## Angular
- Standalone components (for newer versions). Use OnPush change detection when possible.
- Use signals or RxJS as the project does. Always unsubscribe (async pipe, takeUntilDestroyed).
- Keep logic in services, not in components. Use typed reactive forms.

## Svelte and SvelteKit
- Follow the project's Svelte version (runes in Svelte 5, stores in older versions).
- SvelteKit: load data in `+page.ts` / `+page.server.ts`, not in components.

## Accessibility
- Semantic HTML (button, nav, main, header), not clickable divs.
- Alt text on images, labels on form inputs, visible focus styles.
- Full keyboard support and enough color contrast.

## Performance
- Lazy load heavy components and routes. Code split large pages.
- Optimize images (correct size, modern formats, lazy loading).
- Avoid layout shift: set image sizes and reserve space for dynamic content.
- Debounce search inputs and heavy event handlers.

## SEO (public pages)
- Unique title and meta description per page.
- One h1 per page, headings in order.
- Use server rendering or static generation for pages that must be indexed.

## Styling
- Use the project's styling method (Tailwind, CSS Modules, SCSS, styled-components). Do not mix new ones.
- Mobile-first responsive design.
