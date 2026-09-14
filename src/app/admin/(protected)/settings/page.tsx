import { getSiteSettings } from "@/lib/data";
import { PageHeader, Card } from "@/components/admin/ui";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { updateSiteSettingsAction } from "@/actions/admin-settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Branding & SEO Settings" };

export default async function AdminSiteSettingsPage() {
  const site = await getSiteSettings();
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <div>
      <PageHeader title="Branding & SEO" description="Company identity, logo, favicon and search engine metadata." />
      <Card>
        <SettingsForm action={updateSiteSettingsAction} submitLabel="Save Branding & SEO">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Company Name</label>
              <input name="companyName" defaultValue={site.companyName} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input name="tagline" defaultValue={site.tagline ?? ""} className={inputClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ImageUploadField name="logoUrl" label="Logo" defaultValue={site.logoUrl} />
            <ImageUploadField name="faviconUrl" label="Favicon" defaultValue={site.faviconUrl} />
          </div>

          <div>
            <label className={labelClass}>SEO Site Title</label>
            <input name="siteTitle" defaultValue={site.siteTitle ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea name="metaDescription" rows={3} defaultValue={site.metaDescription ?? ""} className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageUploadField name="ogImageUrl" label="Open Graph Image" defaultValue={site.ogImageUrl} />
            <div>
              <label className={labelClass}>Canonical URL</label>
              <input name="canonicalUrl" defaultValue={site.canonicalUrl ?? ""} className={inputClass} placeholder="https://yourdomain.com" />
            </div>
          </div>
        </SettingsForm>
      </Card>
    </div>
  );
}
