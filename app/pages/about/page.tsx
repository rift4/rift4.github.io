import type { Metadata } from "next";

import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "About Me",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader showHomeLink />

      <main>
        <section id="about">
          Hello, world! <br />
          <br />
          My name is [redacted], but you can call me Felix, rift4, rift,
          whatever you want to
          <br />
          i&apos;m from earth, located inside the Solar System, J2000 `0,0,0` at
          equinux J2000.0
          <br />
          <br />
          i&apos;m a teenager, student, developer.
          <br />
          i have experience in: <br />
          - C/C++<br />
          - HTML/CSS<br />
          - JavaScript(X) and TypeScript(X)<br />
          - occasional Rust and Python
          <br />
        </section>
      </main>
    </>
  );
}
