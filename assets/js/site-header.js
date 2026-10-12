(function renderSiteHeader() {
  const headerPlaceholder = document.querySelector("#site-header");
  const siteRoot = new URL("../../", document.currentScript.src);
  const topbar = document.createElement("header");
  topbar.className = "topbar";

  const githubLink = document.createElement("a");
  githubLink.className = "github-link";
  githubLink.href = "https://github.com/rift4";
  githubLink.setAttribute("aria-label", "GitHub profile");

  const githubIcon = document.createElement("img");
  githubIcon.src = new URL("assets/svgs/github.svg", siteRoot);
  githubIcon.alt = "";
  githubLink.append(githubIcon);
  topbar.append(githubLink);

  if (headerPlaceholder.hasAttribute("data-show-home-link")) {
    const homeLink = document.createElement("a");
    homeLink.className = "home-link";
    homeLink.href = new URL("index.html", siteRoot);
    homeLink.setAttribute("aria-label", "Home");

    const homeIcon = document.createElement("span");
    homeIcon.className = "home-icon";
    homeIcon.setAttribute("aria-hidden", "true");
    homeLink.append(homeIcon);
    topbar.append(homeLink);
  }

  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.id = "theme-toggle";
  themeToggle.type = "button";
  themeToggle.setAttribute("aria-label", "System Mode");
  themeToggle.title = "System Mode";

  for (const [mode, icon] of [
    ["system", "computer"],
    ["light", "light"],
    ["dark", "dark"],
  ]) {
    const themeIcon = document.createElement("img");
    themeIcon.className = `theme-icon theme-icon-${mode}`;
    themeIcon.src = new URL(`assets/icons/${icon}.svg`, siteRoot);
    themeIcon.alt = "";
    themeToggle.append(themeIcon);
  }

  topbar.append(themeToggle);
  headerPlaceholder.replaceWith(topbar);
})();
