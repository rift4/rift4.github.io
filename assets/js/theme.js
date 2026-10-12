const themeToggle = document.querySelector("#theme-toggle");
const themeModes = ["system", "light", "dark"];
const themeLabels = {
  system: "System Mode",
  light: "Light Mode",
  dark: "Dark Mode",
};

themeToggle.addEventListener("click", () => {
  const currentIndex = themeModes.indexOf(document.body.dataset.theme);
  const nextMode = themeModes[(currentIndex + 1) % themeModes.length];

  document.body.dataset.theme = nextMode;
  themeToggle.setAttribute("aria-label", themeLabels[nextMode]);
  themeToggle.title = themeLabels[nextMode];
});
