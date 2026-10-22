# Hello, World!

this is my site, hosted through github pages (and vercel)
it is simple and fun

## Stack

- [Next.js](https://nextjs.org) (App Router, static export)
- [Bun](https://bun.sh) for installing, running, and building
- plain CSS with design tokens in `app/globals.css`

## Running it

```sh
bun install
bun run dev      # http://localhost:3000
```

## Building it

```sh
bun run build    # writes the static site to out/
bun run preview  # serves out/ locally
```

`output: "export"` in `next.config.ts` means there is no server runtime: the
build is just HTML, CSS, JS, and fonts. That is what lets the same output work
on both GitHub Pages and Vercel.

## Layout

```
app/
  layout.tsx                    root document, fonts, metadata
  page.tsx                      /
  pages/about/page.tsx          /pages/about/
  projects/projects/page.tsx    /projects/projects/
  contact/contact/page.tsx      /contact/contact/
  components/site-header.tsx    top bar: github, home, theme
  components/theme-toggle.tsx   client component cycling system/light/dark
  globals.css                   the whole design system
public/                         favicon and icons
vercel.json                     rewrites /openchat to the OpenChat deployment
```

Routes intentionally mirror the old `.html` paths so existing links keep
working.
