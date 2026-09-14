import { Reveal } from "../Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string | null;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.5rem)] font-extrabold leading-tight text-white">{title}</h2>
      {description && <p className="mt-3 text-base text-slate-300">{description}</p>}
    </Reveal>
  );
}
