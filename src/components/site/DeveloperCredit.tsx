import { buildDeveloperWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { getDeveloperSettings } from "@/lib/data";

export async function DeveloperCredit({ className }: { className?: string }) {
  const developer = await getDeveloperSettings();
  if (!developer.enabled) return null;

  const phone = `${developer.countryCode ?? ""}${developer.whatsappNumber ?? ""}`.trim();
  const message = buildDeveloperWhatsAppMessage(developer.developerName, developer.whatsappMessage);
  const hasPhone = (developer.whatsappNumber ?? "").replace(/\D/g, "").length > 0;

  return (
    <p className={className ?? "text-sm text-[var(--color-muted)]"}>
      {developer.creditText}{" "}
      {hasPhone ? (
        <a
          href={buildWhatsAppLink(phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--color-accent)] underline decoration-dotted underline-offset-4 transition hover:text-white focus-ring"
        >
          {developer.developerName}
        </a>
      ) : (
        <span className="font-semibold">{developer.developerName}</span>
      )}
    </p>
  );
}
