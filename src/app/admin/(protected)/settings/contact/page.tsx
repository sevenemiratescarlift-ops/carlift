import { getContactSettings } from "@/lib/data";
import { PageHeader, Card } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { updateContactSettingsAction } from "@/actions/admin-settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact Settings" };

export default async function AdminContactSettingsPage() {
  const contact = await getContactSettings();
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#00B4D8]";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <div>
      <PageHeader
        title="Contact Settings"
        description="This information (including WhatsApp) powers every contact link and inquiry across the public website."
      />
      <Card>
        <SettingsForm action={updateContactSettingsAction} submitLabel="Save Contact Settings">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Phone Number</label>
              <input name="phone" defaultValue={contact.phone ?? ""} className={inputClass} placeholder="+971 50 000 0000" />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number (with country code)</label>
              <input name="whatsapp" defaultValue={contact.whatsapp ?? ""} className={inputClass} placeholder="+971500000000" />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input name="email" type="email" defaultValue={contact.email ?? ""} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input name="address" defaultValue={contact.address ?? ""} className={inputClass} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Facebook URL</label>
              <input name="facebookUrl" defaultValue={contact.facebookUrl ?? ""} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input name="instagramUrl" defaultValue={contact.instagramUrl ?? ""} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input name="linkedinUrl" defaultValue={contact.linkedinUrl ?? ""} className={inputClass} />
            </div>
          </div>
        </SettingsForm>
      </Card>
    </div>
  );
}
