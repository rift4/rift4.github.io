const themeToggle = document.querySelector("#theme-toggle");
const themeModes = ["system", "light", "dark"];
const themeLabels = {
  system: "System Mode",
  light: "Light Mode",
  dark: "Dark Mode",
};

if (!themeToggle) {
  throw new Error("The shared header must load before the theme script.");
}

const activeMode = document.body.dataset.theme;

if (!themeModes.includes(activeMode)) {
  throw new Error(`Unsupported theme "${activeMode}". Expected system, light, or dark.`);
}

themeToggle.setAttribute("aria-label", themeLabels[activeMode]);
themeToggle.title = themeLabels[activeMode];

themeToggle.addEventListener("click", () => {
  const currentIndex = themeModes.indexOf(document.body.dataset.theme);
  const nextMode = themeModes[(currentIndex + 1) % themeModes.length];

  document.body.dataset.theme = nextMode;
  themeToggle.setAttribute("aria-label", themeLabels[nextMode]);
  themeToggle.title = themeLabels[nextMode];
});
