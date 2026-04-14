import Image from "next/image";
import Link from "next/link";
import { APP_TAGLINE, NAV_LINKS } from "@/utils/constants";

const SOCIALS: {
  href: string;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: (
      <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.4 4.8 18.4 5.1 18.4 5.1c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.4 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <circle cx="7" cy="8" r="1.4" fill="currentColor" />
        <path d="M6 11h2v7H6zM10 11h2v1.3c.5-.8 1.5-1.5 2.8-1.5 2 0 3.2 1.3 3.2 3.6V18h-2v-3.2c0-1.1-.4-1.9-1.5-1.9-1 0-1.6.7-1.6 1.9V18h-2v-7Z" />
      </>
    ),
  },
  {
    href: "mailto:contact@example.com",
    label: "Email",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 6 10 7 10-7" />
      </>
    ),
  },
  {
    href: "https://twitter.com",
    label: "X / Twitter",
    icon: (
      <path d="M18.3 2H21l-6.5 7.4L22 22h-6.1l-4.8-6.2L5.6 22H3l7-8-6.9-12h6.3l4.3 5.7L18.3 2Zm-1 18h1.7L7 4H5.1l12.2 16Z" />
    ),
  },
];

const TECH = ["Next.js", "TypeScript", "Tailwind", "FastAPI", "Keras"];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border bg-surface-2/40 backdrop-blur-sm">
      {/* Animated top accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />

      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white/95 p-1 ring-1 ring-inset ring-white/20 transition-all duration-300 group-hover:shadow-glow">
                <Image
                  src="/images/robot-assistant.png"
                  alt="Logo"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">
                {APP_TAGLINE}
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              A research-focused demo that fuses audio and facial cues through
              cross-modal attention to produce a depression-likelihood
              assessment.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-[11px] font-medium text-yellow-300">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              Research & educational demo — not a medical diagnostic tool.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-border bg-surface-2 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 scale-0 rounded-xl bg-primary/15 transition-transform duration-300 group-hover:scale-100"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-4">
            <FooterHeading>Resources</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <FooterLink href="/about">D-Vlog Dataset</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">Model Architecture</FooterLink>
              </li>
              <li>
                <ComingSoon>Research Paper</ComingSoon>
              </li>
              <li>
                <ComingSoon>API Docs</ComingSoon>
              </li>
            </ul>

            <div className="mt-6">
              <FooterHeading>Built With</FooterHeading>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-muted transition-colors duration-200 hover:border-primary/50 hover:text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted sm:flex-row">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            © {new Date().getFullYear()} {APP_TAGLINE}. All rights reserved.
          </span>
          <span className="flex items-center gap-1.5 text-[11px]">
            Crafted with
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3 text-red-400"
              aria-hidden="true"
            >
              <path d="M12 21s-7-4.5-9.5-9.5C.5 7 4 3 8 3c2 0 3 1 4 2 1-1 2-2 4-2 4 0 7.5 4 5.5 8.5C19 16.5 12 21 12 21Z" />
            </svg>
            for research
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="relative inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ink">
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-px w-6 bg-gradient-to-r from-primary to-transparent"
      />
    </h4>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1.5 text-muted transition-colors duration-200 hover:text-primary"
    >
      <span
        aria-hidden="true"
        className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3"
      />
      <span>{children}</span>
    </Link>
  );
}

function ComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-muted/70">
      {children}
      <span className="rounded-full border border-border bg-surface-3/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted/80">
        Soon
      </span>
    </span>
  );
}
