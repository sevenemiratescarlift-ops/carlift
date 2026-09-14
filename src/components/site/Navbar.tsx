"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({
  companyName,
  logoUrl,
  whatsapp,
}: {
  companyName: string;
  logoUrl: string | null;
  whatsapp: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const whatsappLink = whatsapp
    ? buildWhatsAppLink(whatsapp, `Hello! I'd like to know more about ${companyName}'s services.`)
    : null;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[var(--color-navbar)]/95 shadow-lg backdrop-blur" : "bg-[var(--color-navbar)]/70 backdrop-blur"
      } border-b border-[var(--color-border)]/60`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={companyName} className="h-10 w-auto object-contain" />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-xl brand-gradient text-white font-bold">7E</span>
          )}
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-wide text-white sm:text-lg">{companyName}</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)]">Carlift</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors focus-ring ${
                  active ? "text-[var(--color-accent)]" : "text-slate-100 hover:text-[var(--color-accent)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#availability"
            className="rounded-full bg-[var(--color-button)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[var(--color-button-hover)] focus-ring"
          >
            Check Ride Availability
          </Link>
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-white transition hover:border-[var(--color-accent)] focus-ring"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--color-border)] text-white lg:hidden focus-ring"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-border)]/60 bg-[var(--color-navbar)] px-4 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-ring ${
                  pathname === link.href ? "bg-white/10 text-[var(--color-accent)]" : "text-slate-100 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/#availability"
              className="rounded-full bg-[var(--color-button)] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Check Ride Availability
            </Link>
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--color-border)] px-5 py-3 text-center text-sm font-medium text-white"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
