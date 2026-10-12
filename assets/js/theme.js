(function initializeThemeController() {
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themes = Object.freeze([
    { value: "system", label: "System Mode" },
    { value: "light", label: "Light Mode" },
    { value: "dark", label: "Dark Mode" },
  ]);
  const themeByValue = new Map(themes.map((theme) => [theme.value, theme]));

  if (!themeToggle) {
    throw new Error(
      "Theme controller requires a button marked with data-theme-toggle. Load site-header.js first.",
    );
  }

  function getCurrentTheme() {
    const value = document.body.dataset.theme;
    const theme = themeByValue.get(value);

    if (!theme) {
      throw new Error(
        `Unsupported theme "${value}". Set body[data-theme] to system, light, or dark.`,
      );
    }

    return theme;
  }

  function setTheme(value) {
    const theme = themeByValue.get(value);

    if (!theme) {
      throw new Error(
        `Unsupported theme "${value}". Expected one of: ${themes.map(({ value }) => value).join(", ")}.`,
      );
    }

    document.body.dataset.theme = theme.value;
    themeToggle.setAttribute("aria-label", theme.label);
    themeToggle.title = theme.label;
    document.dispatchEvent(
      new CustomEvent("site:themechange", {
        detail: { theme: theme.value },
      }),
    );
  }

  const initialTheme = getCurrentTheme();
  themeToggle.setAttribute("aria-label", initialTheme.label);
  themeToggle.title = initialTheme.label;

  themeToggle.addEventListener("click", () => {
    const currentTheme = getCurrentTheme();
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setTheme(nextTheme.value);
  });
})();
