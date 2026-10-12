# rift4.github.io is my home on the internet

> Spoilers: it's not actually on GitHub Pages. Well it is, but it's deployed through Vercel and into my free site at: https://rift4.dpdns.org/

A small, framework-free personal website and reusable static-site template. It is
built with plain HTML, CSS, and JavaScript, so the files can be deployed directly
to Vercel or served by any static web host.

## Pages

- `index.html` — landing page
- `pages/about.html` — about page
- `projects/projects.html` — project cards
- `contact/contact.html` — contact details

Every page uses the shared stylesheet and JavaScript in `assets/`. The top bar is
created by `assets/js/site-header.js`, which keeps the GitHub link, home link,
and theme control consistent without a build-time template engine. The home link
is included on subpages and omitted on the landing page.

## Design system

`style.css` is both the stylesheet entry point and the design system. The
`@layer` order keeps reusable foundations separate from page-specific styles;
remove or replace the `pages` layer when adapting the base for a different site.
Its sections are ordered from reusable foundations to page-specific components:

1. Font assets
2. Design tokens
3. Global foundation
4. Shared navigation
5. Top bar and theme control
6. Landing page
7. Projects
8. Contact

Start customization in the `:root` token block near the top of `style.css`.
Tokens cover:

- Brand and semantic colors, including the orange accent
- Font family, a type scale, weights, and line heights
- Spacing scale
- Page gutters, content dimensions, icon sizes, and control sizes
- Borders and shapes
- Opacity and motion timing

Dark and system themes override semantic color tokens, so components can use
the same foreground and background variables in every mode. The home layout
uses `100svh` where supported and falls back to `100vh`; `svh` keeps the layout
anchored to the stable mobile viewport as browser controls expand and collapse.

### Theme contract

Every page sets `data-theme` on `<body>` to exactly one of `system`, `light`, or
`dark`. The shared `assets/js/theme.js` script expects one button marked with
`data-theme-toggle`; `assets/js/site-header.js` creates it before the theme
controller runs. Keep both deferred scripts in that order.

The controller validates the initial body state and the state on every click,
then cycles `system → light → dark → system`. Its mode values and accessible
labels are declared together in the `themes` list at the top of
`theme.js`. Keep those values in sync with the CSS selectors when customizing
or adding modes. System mode follows `prefers-color-scheme`.

After setting a mode, the controller dispatches a `site:themechange` event on
`document` with the selected mode in `event.detail.theme`. Other scripts can
listen for this event to update theme-dependent components.

### Asset paths

CSS asset URLs are relative to `style.css`. Keep this layout when reusing the
template:

- `assets/fonts/NeueCometVariable.woff2` is the font source in the `@font-face`
  rule at the top of the stylesheet.
- `favicon.svg` is the landing mark. Its URL is configurable with the
  `--asset-home-mark` token in `:root`.

If you move either asset, update the corresponding source URL and token. The
HTML pages also reference the favicon and font for browser metadata/preloading;
update those page paths as well. The shared header script resolves its icon URLs
relative to itself.

## Reuse this template

1. Copy or fork the repository.
2. Update the page content and links in the HTML files.
3. Change the design tokens in `style.css` to customize colors, typography,
   spacing, and component sizing.
4. Replace the icons in `assets/icons/` and `assets/svgs/` as desired.
5. Replace `favicon.svg` and the font in `assets/fonts/` if you want different
   branding. Update their URLs in `style.css` and the page `<head>` elements
   when changing asset locations.
6. Update the profile and contact links in the page markup and
   `assets/js/site-header.js`.

The shared header script requires exactly one element with `id="site-header"`
on each page. It derives the asset root from the expected `assets/js/` location
of the script. Add `data-show-home-link` on subpages to include the centered
home icon.

The placeholder accepts optional configuration attributes:

```html
<div
  id="site-header"
  data-show-home-link
  data-site-root="/my-site/"
  data-home-page="index.html"
  data-github-url="https://github.com/your-name"
></div>
```

- `data-site-root` overrides the detected site root; it may be an absolute URL
  or a path (a relative path resolves from the current page).
- `data-home-page` overrides the default `index.html` link, relative to the
  site root.
- `data-github-url` overrides the default GitHub profile link and must use
  `http:` or `https:`.

Keep `assets/svgs/github.svg` and the three theme icons under
`assets/icons/{computer,light,dark}.svg` relative to the site root, or update
the `ASSETS` map in `assets/js/site-header.js`. A missing or duplicated
placeholder causes an explicit setup error instead of silently omitting the
header.

The global, navigation, and theme styles are in separate CSS cascade layers
from the landing, projects, and contact styles. The reduced-motion media query
disables transitions for every animated component.

## Deploy to Vercel

This is a static site and has no install, build, or runtime dependencies.

1. Import the repository into Vercel.
2. Choose **Other** as the framework preset.
3. Leave the install and build commands empty.
4. Use the repository root (`.`) as the output directory.

The site can also be previewed locally by opening `index.html` in a browser.

## Project structure

```text
.
├── index.html
├── pages/
│   └── about.html
├── projects/
│   └── projects.html
├── contact/
│   └── contact.html
├── style.css
├── assets/
│   ├── fonts/
│   ├── icons/
│   ├── js/
│   │   ├── site-header.js
│   │   └── theme.js
│   └── svgs/
└── favicon.svg
```

## License

The repository is available under the MIT License; see [LICENSE](LICENSE).
Check the licenses for bundled fonts and other assets before redistributing
them separately or replacing them in a template fork.
