import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  /** Home is the current page, so it only gets a home link on inner pages. */
  showHomeLink?: boolean;
};

export function SiteHeader({ showHomeLink = false }: SiteHeaderProps) {
  return (
    <header className="topbar">
      <a
        className="github-link"
        href="https://github.com/rift4"
        aria-label="GitHub profile"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/svgs/github.svg" alt="" width={24} height={24} />
      </a>

      {showHomeLink ? (
        <Link className="home-link" href="/" aria-label="Home">
          <span className="home-icon" aria-hidden="true" />
        </Link>
      ) : null}

      <ThemeToggle />
    </header>
  );
}
