import Image from "next/image";
import Link from "next/link";
import type { Banner } from "@/db/schema";
import { Reveal } from "../Reveal";

export function BannerSection({ banners }: { banners: Banner[] }) {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {banners.map((banner, i) => (
          <Reveal key={banner.id} delay={i * 0.08}>
            <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <Image src={banner.imageUrl} alt={banner.title || "Promotional banner"} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                {banner.title && <h3 className="text-lg font-bold text-white">{banner.title}</h3>}
                {banner.description && <p className="mt-1 line-clamp-2 text-sm text-slate-200">{banner.description}</p>}
                {banner.ctaText && banner.ctaLink && (
                  <Link
                    href={banner.ctaLink}
                    className="mt-3 inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-bold text-slate-900"
                  >
                    {banner.ctaText} →
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
