import type { Metadata } from "next";
import { getContactSettings, getServiceTypes } from "@/lib/data";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const [contact, serviceTypes] = await Promise.all([getContactSettings(), getServiceTypes(true)]);
  const whatsappLink = contact.whatsapp
    ? buildWhatsAppLink(contact.whatsapp, "Hello! I'd like to get in touch with 7 Emirates Carlift.")
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Contact</p>
        <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">Get In Touch</h1>
        <p className="mt-3 text-base text-slate-300">
          We're available around the clock — reach out to plan your next ride or ask us anything.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal direction="right" className="space-y-4">
          {contact.phone && (
            <ContactRow icon="📞" label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />
          )}
          {contact.email && (
            <ContactRow icon="✉️" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          )}
          {contact.address && <ContactRow icon="📍" label="Address" value={contact.address} />}
          {whatsappLink && <ContactRow icon="💬" label="WhatsApp" value="Chat with us" href={whatsappLink} external />}
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <InquiryForm serviceTypes={serviceTypes} whatsapp={contact.whatsapp} />
        </Reveal>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white/5 p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--color-accent)]/15 text-2xl">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{label}</p>
        <p className="mt-1 text-base font-medium text-white">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="block focus-ring rounded-2xl">
      {content}
    </a>
  );
}
