import { getHomepageSettings } from "@/lib/data";
import { PageHeader, Card } from "@/components/admin/ui";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { updateHomepageSettingsAction } from "@/actions/admin-settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Homepage Settings" };

const SECTION_TOGGLES: { key: string; label: string }[] = [
  { key: "showHero", label: "Hero Section" },
  { key: "showAvailability", label: "Check Ride Availability" },
  { key: "showServices", label: "Services" },
  { key: "showFleet", label: "Featured Fleet" },
  { key: "showAbout", label: "About" },
  { key: "showWhyChoose", label: "Why Choose Us" },
  { key: "showHowItWorks", label: "How It Works" },
  { key: "showReviews", label: "Reviews" },
  { key: "showFaq", label: "FAQ" },
  { key: "showContactCta", label: "Contact CTA" },
];

export default async function AdminHomepageSettingsPage() {
  const homepage = await getHomepageSettings();

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";

  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  const homepageRecord = homepage as unknown as Record<string, unknown>;

  return (
    <div>
      <PageHeader
        title="Homepage Settings"
        description="Control hero content, section copy and which sections are visible."
      />

      <Card>
        <SettingsForm
          action={updateHomepageSettingsAction}
          submitLabel="Save Homepage Settings"
        >
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#00B4D8]">
            Hero Section
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Hero Title</label>
              <input
                name="heroTitle"
                defaultValue={homepage.heroTitle ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Hero Description</label>
              <input
                name="heroDescription"
                defaultValue={homepage.heroDescription ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <ImageUploadField
            name="heroImageUrl"
            label="Hero Background Image"
            defaultValue={homepage.heroImageUrl}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Primary Button Text</label>
              <input
                name="heroPrimaryButtonText"
                defaultValue={homepage.heroPrimaryButtonText ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Primary Button Link</label>
              <input
                name="heroPrimaryButtonLink"
                defaultValue={homepage.heroPrimaryButtonLink ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Secondary Button Text</label>
              <input
                name="heroSecondaryButtonText"
                defaultValue={homepage.heroSecondaryButtonText ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Secondary Button Link</label>
              <input
                name="heroSecondaryButtonLink"
                defaultValue={homepage.heroSecondaryButtonLink ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <h3 className="pt-4 text-sm font-bold uppercase tracking-wide text-[#00B4D8]">
            Availability & About
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Availability Title</label>
              <input
                name="availabilityTitle"
                defaultValue={homepage.availabilityTitle ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Availability Description</label>
              <input
                name="availabilityDescription"
                defaultValue={homepage.availabilityDescription ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>About Title</label>
              <input
                name="aboutTitle"
                defaultValue={homepage.aboutTitle ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Why Choose Title</label>
              <input
                name="whyChooseTitle"
                defaultValue={homepage.whyChooseTitle ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <ImageUploadField
            name="aboutImageUrl"
            label="About Image"
            defaultValue={
              typeof homepageRecord.aboutImageUrl === "string"
                ? homepageRecord.aboutImageUrl
                : ""
            }
          />

          <div>
            <label className={labelClass}>About Description</label>
            <textarea
              name="aboutDescription"
              rows={3}
              defaultValue={homepage.aboutDescription ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Why Choose Description</label>
            <textarea
              name="whyChooseDescription"
              rows={2}
              defaultValue={homepage.whyChooseDescription ?? ""}
              className={inputClass}
            />
          </div>

          <h3 className="pt-4 text-sm font-bold uppercase tracking-wide text-[#00B4D8]">
            How It Works & Contact CTA
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>How It Works Title</label>
              <input
                name="howItWorksTitle"
                defaultValue={homepage.howItWorksTitle ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Contact CTA Title</label>
              <input
                name="contactCtaTitle"
                defaultValue={homepage.contactCtaTitle ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Contact CTA Description</label>
            <textarea
              name="contactCtaDescription"
              rows={2}
              defaultValue={homepage.contactCtaDescription ?? ""}
              className={inputClass}
            />
          </div>

          <h3 className="pt-4 text-sm font-bold uppercase tracking-wide text-[#00B4D8]">
            Section Visibility
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SECTION_TOGGLES.map((toggle) => (
              <label
                key={toggle.key}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                <input
                  type="checkbox"
                  name={toggle.key}
                  defaultChecked={Boolean(
                    homepageRecord[toggle.key] ?? true
                  )}
                  className="h-4 w-4 accent-[#00B4D8]"
                />
                {toggle.label}
              </label>
            ))}
          </div>
        </SettingsForm>
      </Card>
    </div>
  );
}