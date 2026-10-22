"use client";

import { useEffect, useState } from "react";

const themes = [
  { value: "system", label: "System Mode", icon: "computer" },
  { value: "light", label: "Light Mode", icon: "light" },
  { value: "dark", label: "Dark Mode", icon: "dark" },
] as const;

type Theme = (typeof themes)[number];

/**
 * Cycles system -> light -> dark. The active theme lives on
 * `body[data-theme]`, which the stylesheet uses to pick its color tokens.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    document.body.dataset.theme = theme.value;
  }, [theme]);

  function handleClick() {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setTheme(nextTheme);
    document.dispatchEvent(
      new CustomEvent("site:themechange", {
        detail: { theme: nextTheme.value },
      }),
    );
  }

  return (
    <button
      className="theme-toggle"
      data-theme-toggle=""
      type="button"
      aria-label={theme.label}
      title={theme.label}
      onClick={handleClick}
    >
      {themes.map(({ value, icon }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={value}
          className={`theme-icon theme-icon-${value}`}
          src={`/assets/icons/${icon}.svg`}
          alt=""
          width={18}
          height={18}
        />
      ))}
    </button>
  );
}
