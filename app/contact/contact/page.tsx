import type { Metadata } from "next";

import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader showHomeLink />

      <main>
        <section id="contact">
          <div className="contact-entry">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mail-icon" src="/assets/svgs/tuta-mail.svg" alt="" />
            mail:{" "}
            <a href="mailto:felixdayapper@tutamail.com">
              felixdayapper@tutamail.com
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
