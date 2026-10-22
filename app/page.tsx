import Link from "next/link";

import { SiteHeader } from "./components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section id="home">
          <h1 className="home-title">Hi, I&apos;m Felix</h1>

          <div className="home-menu">
            <span className="home-icon" aria-hidden="true" />

            <nav className="home-navigation" aria-label="Sections">
              <Link href="/">Home</Link>
              <Link href="/pages/about/">About Me</Link>
              <Link href="/projects/projects/">Projects</Link>
              <Link href="/contact/contact/">Contact</Link>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
}
