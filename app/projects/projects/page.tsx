import type { Metadata } from "next";

import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Projects",
};

const projects = [
  {
    title: "rift4.github.io",
    description: "this site",
    href: "https://github.com/rift4/rift4.github.io",
  },
  {
    title: "gfxdemo",
    description: "graphics demo for the terminal using C",
    href: "https://github.com/rift4/gfxdemo",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader showHomeLink />

      <main>
        <section id="projects">
          {projects.map(({ title, description, href }) => (
            <a className="project-card" href={href} key={href}>
              <span className="project-card-title">{title}</span>
              <span className="project-card-description">{description}</span>
              <span className="project-card-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </section>
      </main>
    </>
  );
}
