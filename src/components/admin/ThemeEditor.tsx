"use client";

import { useActionState, useState } from "react";
import { THEME_PRESETS, type ThemeColors } from "@/lib/theme-presets";
import { updateThemeSettingsAction, resetThemeSettingsAction, type SettingsActionState } from "@/actions/admin-settings";

const FIELD_LABELS: { key: keyof ThemeColors; label: string }[] = [
  { key: "primaryColor", label: "Primary" },
  { key: "secondaryColor", label: "Secondary" },
  { key: "accentColor", label: "Accent" },
  { key: "backgroundColor", label: "Background" },
  { key: "cardColor", label: "Card" },
  { key: "textColor", label: "Text" },
  { key: "mutedTextColor", label: "Muted Text" },
  { key: "borderColor", label: "Border" },
  { key: "navbarColor", label: "Navbar" },
  { key: "footerColor", label: "Footer" },
  { key: "buttonColor", label: "Button" },
  { key: "buttonHoverColor", label: "Button Hover" },
  { key: "gradientStart", label: "Gradient Start" },
  { key: "gradientEnd", label: "Gradient End" },
];

export function ThemeEditor({ initial, presetName }: { initial: ThemeColors; presetName: string }) {
  const [colors, setColors] = useState<ThemeColors>(initial);
  const [preset, setPreset] = useState(presetName || "custom");
  const [state, formAction, isPending] = useActionState<SettingsActionState, FormData>(updateThemeSettingsAction, null);

  function applyPreset(name: string) {
    setPreset(name);
    const found = THEME_PRESETS.find((p) => p.name === name);
    if (found) setColors(found);
  }

  function updateColor(key: keyof ThemeColors, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
    setPreset("custom");
  }

  const previewStyle = {
    "--preview-primary": colors.primaryColor,
    "--preview-secondary": colors.secondaryColor,
    "--preview-accent": colors.accentColor,
    "--preview-bg": colors.backgroundColor,
    "--preview-card": colors.cardColor,
    "--preview-text": colors.textColor,
    "--preview-muted": colors.mutedTextColor,
    "--preview-border": colors.borderColor,
    "--preview-button": colors.buttonColor,
    "--preview-gradient-start": colors.gradientStart,
    "--preview-gradient-end": colors.gradientEnd,
  } as React.CSSProperties;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="presetName" value={preset} />

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">Preset Themes</label>
          <div className="flex flex-wrap gap-2">
            {THEME_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p.name)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  preset === p.name ? "border-[#00B4D8] bg-[#00B4D8]/10 text-white" : "border-white/15 text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.primaryColor }} />
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPreset("custom")}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                preset === "custom" ? "border-[#00B4D8] bg-[#00B4D8]/10 text-white" : "border-white/15 text-slate-300 hover:bg-white/5"
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FIELD_LABELS.map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{field.label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors[field.key] || "#000000"}
                  onChange={(e) => updateColor(field.key, e.target.value)}
                  className="h-10 w-12 shrink-0 rounded-lg border border-white/15 bg-transparent"
                />
                <input
                  type="text"
                  name={field.key}
                  value={colors[field.key] || ""}
                  onChange={(e) => updateColor(field.key, e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#00B4D8]"
                />
              </div>
            </div>
          ))}
        </div>

        {state?.error && <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">{state.error}</p>}
        {state?.success && <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{state.success}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={isPending} className="rounded-full bg-[#00B4D8] px-8 py-3 text-sm font-bold text-slate-900 disabled:opacity-60">
            {isPending ? "Saving..." : "Save Theme"}
          </button>
          <button
            type="button"
            onClick={async () => {
              await resetThemeSettingsAction();
              window.location.reload();
            }}
            className="rounded-full border border-white/15 px-8 py-3 text-sm font-bold text-slate-200 hover:bg-white/5"
          >
            Reset to Default
          </button>
        </div>
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Live Preview</p>
        <div
          style={previewStyle}
          className="overflow-hidden rounded-2xl border"
          data-preview
        >
          <div
            className="p-4"
            style={{
              background: `linear-gradient(135deg, var(--preview-gradient-start), var(--preview-gradient-end))`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">7 Emirates Carlift</span>
              <span
                className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                Menu
              </span>
            </div>
            <h3 className="mt-6 text-xl font-extrabold text-white">Premium Transportation in Dubai</h3>
            <p className="mt-2 text-sm text-white/85">Travel in comfort with our modern fleet.</p>
            <button
              className="mt-4 rounded-full px-5 py-2.5 text-xs font-bold text-white"
              style={{ backgroundColor: "var(--preview-button)" }}
            >
              Check Availability
            </button>
          </div>
          <div className="p-4" style={{ backgroundColor: "var(--preview-bg)" }}>
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--preview-border)", backgroundColor: "var(--preview-card)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--preview-text)" }}>Toyota Camry</p>
              <p className="text-xs" style={{ color: "var(--preview-muted)" }}>Sedan · 5 Seats · AC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
