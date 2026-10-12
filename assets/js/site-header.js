(function initializeSiteHeader() {
  const HEADER_PLACEHOLDER_SELECTOR = "#site-header";
  const HEADER_CLASS = "topbar";
  const GITHUB_URL = "https://github.com/rift4";
  const HOME_PAGE = "index.html";
  const ASSETS = Object.freeze({
    github: "assets/svgs/github.svg",
    themeIcons: Object.freeze([
      { mode: "system", file: "assets/icons/computer.svg" },
      { mode: "light", file: "assets/icons/light.svg" },
      { mode: "dark", file: "assets/icons/dark.svg" },
    ]),
  });

  function getPlaceholder() {
    const placeholders = document.querySelectorAll(HEADER_PLACEHOLDER_SELECTOR);

    if (placeholders.length !== 1) {
      throw new Error(
        `Site header requires exactly one ${HEADER_PLACEHOLDER_SELECTOR} placeholder; found ${placeholders.length}.`,
      );
    }

    return placeholders[0];
  }

  function getScriptUrl() {
    const scriptUrl = document.currentScript?.src;

    if (!scriptUrl) {
      throw new Error(
        "Site header must be loaded as a classic script with a src URL.",
      );
    }

    return new URL(scriptUrl);
  }

  function getSiteRoot(placeholder, scriptUrl) {
    const configuredRoot = placeholder.dataset.siteRoot;
    const siteRoot = configuredRoot
      ? new URL(configuredRoot, document.baseURI)
      : new URL("../../", scriptUrl);

    if (!siteRoot.pathname.endsWith("/")) {
      siteRoot.pathname += "/";
    }

    return siteRoot;
  }

  function createIcon(src, className) {
    const icon = document.createElement("img");
    icon.src = src;
    icon.alt = "";

    if (className) {
      icon.className = className;
    }

    return icon;
  }

  function createProfileLink(placeholder, siteRoot) {
    const profileUrl = new URL(
      placeholder.dataset.githubUrl || GITHUB_URL,
      document.baseURI,
    );

    if (profileUrl.protocol !== "https:" && profileUrl.protocol !== "http:") {
      throw new Error("Site header GitHub profile URL must use HTTP or HTTPS.");
    }

    const link = document.createElement("a");
    link.className = "github-link";
    link.href = profileUrl;
    link.setAttribute("aria-label", "GitHub profile");
    link.append(createIcon(new URL(ASSETS.github, siteRoot)));

    return link;
  }

  function createHomeLink(placeholder, siteRoot) {
    if (!placeholder.hasAttribute("data-show-home-link")) {
      return null;
    }

    const link = document.createElement("a");
    link.className = "home-link";
    link.href = new URL(placeholder.dataset.homePage || HOME_PAGE, siteRoot);
    link.setAttribute("aria-label", "Home");

    const icon = document.createElement("span");
    icon.className = "home-icon";
    icon.setAttribute("aria-hidden", "true");
    link.append(icon);

    return link;
  }

  function createThemeToggle(siteRoot) {
    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    toggle.setAttribute("data-theme-toggle", "");
    toggle.type = "button";
    toggle.setAttribute("aria-label", "System Mode");
    toggle.title = "System Mode";

    for (const { mode, file } of ASSETS.themeIcons) {
      toggle.append(
        createIcon(new URL(file, siteRoot), `theme-icon theme-icon-${mode}`),
      );
    }

    return toggle;
  }

  const placeholder = getPlaceholder();
  const siteRoot = getSiteRoot(placeholder, getScriptUrl());
  const header = document.createElement("header");
  header.className = HEADER_CLASS;
  header.append(createProfileLink(placeholder, siteRoot));

  const homeLink = createHomeLink(placeholder, siteRoot);

  if (homeLink) {
    header.append(homeLink);
  }

  header.append(createThemeToggle(siteRoot));
  placeholder.replaceWith(header);
})();
