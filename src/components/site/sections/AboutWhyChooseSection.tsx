import Image from "next/image";
import type { HomepageSettings } from "@/db/schema";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

const HIGHLIGHTS = [
  "Reliable Transportation",
  "Professional Drivers",
  "Comfortable Vehicles",
  "24/7 Customer Support",
];

export function AboutWhyChooseSection({
  homepage,
}: {
  homepage: HomepageSettings;
}) {
  const aboutImage =
    homepage.aboutImageUrl || "/images/about-dubai.jpg";

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal direction="right">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--color-border)]">
            <Image
              src={aboutImage}
              alt="Dubai skyline at dusk with a premium car"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/70 via-transparent to-transparent" />
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Why Choose Us
          </p>

          <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.5rem)] font-extrabold leading-tight text-white">
            {homepage.aboutTitle || "Your Comfort, Our Commitment"}
          </h2>

          <p className="mt-4 text-base text-slate-300">
            {homepage.aboutDescription ||
              "We provide safe, reliable and luxurious transportation services across Dubai and the UAE. With a professional team and modern fleet, your journey is always in good hands."}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-slate-200"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}