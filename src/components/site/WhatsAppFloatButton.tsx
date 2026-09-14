import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloatButton({ whatsapp }: { whatsapp: string | null }) {
  if (!whatsapp) return null;
  const link = buildWhatsAppLink(whatsapp, "Hello! I'd like to inquire about your transportation services.");

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:scale-105 focus-ring"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.61 1.902 6.487L4 29l7.72-1.867A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.71 9.71 0 0 1-4.95-1.354l-.355-.21-4.583 1.108 1.127-4.463-.232-.366A9.69 9.69 0 0 1 5.25 15c0-5.93 4.824-10.75 10.754-10.75S26.75 9.07 26.75 15 21.934 24.75 16.004 24.75Zm5.34-7.29c-.293-.147-1.734-.856-2.003-.953-.269-.098-.464-.147-.66.147-.196.293-.756.953-.927 1.148-.171.196-.342.22-.635.073-.293-.147-1.236-.456-2.354-1.453-.87-.776-1.458-1.735-1.629-2.028-.171-.293-.018-.452.129-.598.132-.132.293-.342.44-.513.147-.171.196-.293.293-.489.098-.196.049-.366-.024-.513-.073-.147-.66-1.593-.904-2.18-.238-.573-.48-.496-.66-.505l-.562-.01c-.196 0-.513.073-.782.366-.269.293-1.026 1.002-1.026 2.443 0 1.44 1.05 2.833 1.197 3.03.147.196 2.067 3.157 5.008 4.428.7.302 1.246.483 1.672.618.702.223 1.341.191 1.846.116.563-.084 1.734-.708 1.978-1.392.244-.684.244-1.27.171-1.392-.073-.122-.269-.196-.562-.343Z" />
      </svg>
    </a>
  );
}
