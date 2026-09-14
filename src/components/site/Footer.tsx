import Link from "next/link";
import { getContactSettings, getServices, getSiteSettings } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { DeveloperCredit } from "./DeveloperCredit";

export async function Footer() {
  const [site, contact, footerServices] = await Promise.all([
    getSiteSettings(),
    getContactSettings(),
    getServices(true),
  ]);

  const whatsappLink = contact.whatsapp
    ? buildWhatsAppLink(contact.whatsapp, `Hello! I'd like to know more about ${site.companyName}'s services.`)
    : null;

  return (
    <footer className="border-t border-[var(--color-border)]/60 bg-[var(--color-footer)] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            {site.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.logoUrl} alt={site.companyName} className="h-10 w-auto object-contain" />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-xl brand-gradient text-white font-bold">7E</span>
            )}
            <span className="text-lg font-bold text-white">{site.companyName}</span>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            {site.tagline || "Premium, safe and reliable transportation across Dubai and the UAE."}
          </p>
          <div className="mt-5 flex gap-3">
            {contact.facebookUrl && (
              <SocialIcon href={contact.facebookUrl} label="Facebook">
                <path d="M13 22v-8h2.6l.4-3H13V9c0-.9.3-1.5 1.7-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H8v3h2v8h3Z" />
              </SocialIcon>
            )}
            {contact.instagramUrl && (
              <SocialIcon href={contact.instagramUrl} label="Instagram">
                <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM16.9 7a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM12 4.7c2.4 0 2.7 0 3.6.05 2.2.1 3.2 1.13 3.3 3.3.05.9.05 1.17.05 3.45s0 2.55-.05 3.45c-.1 2.17-1.1 3.2-3.3 3.3-.9.05-1.16.05-3.6.05s-2.7 0-3.6-.05c-2.2-.1-3.2-1.14-3.3-3.3-.05-.9-.05-1.17-.05-3.45s0-2.55.05-3.45c.1-2.17 1.1-3.2 3.3-3.3.9-.05 1.2-.05 3.6-.05ZM12 3c-2.44 0-2.75 0-3.7.06-2.87.13-4.5 1.75-4.63 4.63C3.6 8.64 3.6 8.94 3.6 11.4v1.2c0 2.44 0 2.75.06 3.7.13 2.87 1.75 4.5 4.63 4.62.95.05 1.26.06 3.7.06s2.75 0 3.7-.06c2.87-.12 4.5-1.75 4.63-4.62.05-.95.06-1.26.06-3.7v-1.2c0-2.44 0-2.75-.06-3.7-.13-2.88-1.75-4.5-4.63-4.63C14.75 3 14.45 3 12 3Z" />
              </SocialIcon>
            )}
            {contact.linkedinUrl && (
              <SocialIcon href={contact.linkedinUrl} label="LinkedIn">
                <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 4a1.68 1.68 0 1 0 0 3.36A1.68 1.68 0 0 0 5.5 4ZM20 13.44c0-3.15-1.68-4.62-3.92-4.62-1.8 0-2.61.99-3.06 1.68V8.5H10.14c.04.85 0 11.5 0 11.5h2.88v-6.42c0-.34.02-.68.12-.93.27-.68.87-1.38 1.9-1.38 1.34 0 1.88 1.02 1.88 2.52V20H20v-6.56Z" />
              </SocialIcon>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {[
              ["Home", "/"],
              ["Fleet", "/fleet"],
              ["Services", "/services"],
              ["About", "/about"],
              ["Reviews", "/reviews"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-[var(--color-accent)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {footerServices.slice(0, 6).map((service) => (
              <li key={service.id}>
                <Link href="/services" className="transition hover:text-[var(--color-accent)]">
                  {service.name}
                </Link>
              </li>
            ))}
            {footerServices.length === 0 && <li>Airport Transfer, Car Lift, City Tours &amp; more</li>}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {contact.address && <li>{contact.address}</li>}
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone}`} className="transition hover:text-[var(--color-accent)]">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="transition hover:text-[var(--color-accent)]">
                  {contact.email}
                </a>
              </li>
            )}
            {whatsappLink && (
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-3 py-1.5 font-medium text-[#25D366] transition hover:bg-[#25D366]/20"
                >
                  Chat on WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {site.companyName}. All rights reserved.
          </p>
          <DeveloperCredit />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] text-slate-300 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-ring"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
