import { getDeveloperSettings } from "@/lib/data";
import { PageHeader, Card } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { updateDeveloperSettingsAction } from "@/actions/admin-settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Developer Settings" };

export default async function AdminDeveloperSettingsPage() {
  const developer = await getDeveloperSettings();
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <div>
      <PageHeader title="Developer Credit" description="Controls the 'Designed & Developed by' credit shown on every public page." />
      <Card>
        <SettingsForm action={updateDeveloperSettingsAction} submitLabel="Save Developer Settings">
          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" name="enabled" defaultChecked={developer.enabled} className="h-4 w-4 accent-[#00B4D8]" />
            Show developer credit on public pages
          </label>
          <div>
            <label className={labelClass}>Credit Text</label>
            <input name="creditText" defaultValue={developer.creditText} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Developer Name</label>
            <input name="developerName" defaultValue={developer.developerName} className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Country Code</label>
              <input name="countryCode" defaultValue={developer.countryCode ?? ""} className={inputClass} placeholder="+880" />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input name="whatsappNumber" defaultValue={developer.whatsappNumber ?? ""} className={inputClass} placeholder="1XXXXXXXXXX" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Prefilled WhatsApp Message</label>
            <textarea name="whatsappMessage" rows={3} defaultValue={developer.whatsappMessage ?? ""} className={inputClass} />
          </div>
        </SettingsForm>
      </Card>
    </div>
  );
}
