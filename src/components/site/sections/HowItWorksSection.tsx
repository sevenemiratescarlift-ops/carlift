import { Reveal } from "../Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { number: "01", title: "Choose Your Ride", description: "Browse our fleet and select your preferred vehicle.", icon: "🚗" },
  { number: "02", title: "Send Your Inquiry", description: "Fill in your details and submit the form.", icon: "📝" },
  { number: "03", title: "Confirm Through WhatsApp", description: "We'll get in touch and confirm the details.", icon: "💬" },
  { number: "04", title: "Enjoy Your Journey", description: "Sit back, relax and travel in comfort.", icon: "🎉" },
];

export function HowItWorksSection({ title }: { title: string | null }) {
  return (
    <section className="bg-[var(--color-card)]/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Simple & Easy" title={title || "Booking Steps"} align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-[var(--color-border)] bg-white/5 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl brand-gradient text-xl">{step.icon}</span>
                <p className="mt-4 text-xs font-bold tracking-widest text-[var(--color-accent)]">STEP {step.number}</p>
                <h3 className="mt-1 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
