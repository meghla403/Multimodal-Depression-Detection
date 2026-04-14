import Link from "next/link";
import { APP_NAME, APP_TAGLINE, NAV_LINKS } from "@/utils/constants";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface-2/40 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold gradient-text">{APP_NAME}</h3>
          <p className="mt-2 text-sm text-muted">{APP_TAGLINE}</p>
          <p className="mt-4 text-xs text-muted/80">
            Research & educational demo. Not a medical diagnostic tool.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>LMVD Dataset</li>
            <li>Research Paper (Coming soon)</li>
            <li>API Docs (Coming soon)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</span>
          <span>Built with Next.js, TypeScript & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
