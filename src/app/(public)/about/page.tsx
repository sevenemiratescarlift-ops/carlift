import type { Metadata } from "next";
import Image from "next/image";
import { getHomepageSettings, getSiteSettings } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "About Us" };

const VALUES = [
  {
    title: "Safety First",
    description:
      "Every trip is handled by licensed, background-checked professional drivers.",
    icon: "🛡️",
  },
  {
    title: "Punctuality",
    description:
      "We track flights and traffic to make sure you're never left waiting.",
    icon: "⏱️",
  },
  {
    title: "Comfort",
    description:
      "A modern, well-maintained fleet designed for a smooth, relaxing ride.",
    icon: "🛋️",
  },
  {
    title: "Transparency",
    description:
      "Clear communication on WhatsApp before every booking is confirmed.",
    icon: "💬",
  },
];

export default async function AboutPage() {
  const [homepage, site] = await Promise.all([
    getHomepageSettings(),
    getSiteSettings(),
  ]);

  const aboutImage =
    homepage.aboutImageUrl || "/images/about-dubai.jpg";

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal direction="right">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            About {site.companyName}
          </p>

          <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">
            {homepage.aboutTitle || "Your Comfort, Our Commitment"}
          </h1>

          <p className="mt-4 text-base text-slate-300">
            {homepage.aboutDescription ||
              `${site.companyName} delivers safe, reliable and premium transportation across Dubai and the UAE. From airport transfers to corporate travel and daily car lift arrangements, our professional team and modern fleet ensure every journey is comfortable and stress-free.`}
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--color-border)]">
            <Image
              src={aboutImage}
              alt="Premium car service in Dubai"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-[var(--color-border)] bg-white/5 p-6 text-center">
              <span className="text-3xl">{value.icon}</span>

              <h3 className="mt-3 font-bold text-white">
                {value.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {value.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}