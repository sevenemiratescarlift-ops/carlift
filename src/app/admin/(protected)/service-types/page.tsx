import Link from "next/link";
import { getServiceTypes } from "@/lib/data";
import { PageHeader, Card, ToggleButton, ConfirmDeleteButton, ReorderButtons } from "@/components/admin/ui";
import { deleteServiceTypeAction, reorderServiceTypeAction, toggleServiceTypePublishedAction } from "@/actions/admin-catalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "Service Types" };

export default async function AdminServiceTypesPage() {
  const serviceTypes = await getServiceTypes(false);

  return (
    <div>
      <PageHeader
        title="Service Types"
        description="Options shown in the optional 'Service Type' dropdown on booking forms."
        action={
          <Link href="/admin/service-types/new" className="rounded-full bg-[#00B4D8] px-5 py-2.5 text-sm font-bold text-slate-900">
            + Add Service Type
          </Link>
        }
      />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Order</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {serviceTypes.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-slate-500">No service types yet.</td></tr>
              )}
              {serviceTypes.map((st) => (
                <tr key={st.id}>
                  <td className="p-4">
                    <p className="font-semibold text-white">{st.name}</p>
                    {st.description && <p className="text-xs text-slate-500">{st.description}</p>}
                  </td>
                  <td className="p-4">
                    <ToggleButton active={st.published} onToggle={async (next) => { "use server"; await toggleServiceTypePublishedAction(st.id, next); }} />
                  </td>
                  <td className="p-4">
                    <ReorderButtons
                      onUp={async () => { "use server"; await reorderServiceTypeAction(st.id, "up"); }}
                      onDown={async () => { "use server"; await reorderServiceTypeAction(st.id, "down"); }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/service-types/${st.id}/edit`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5">
                        Edit
                      </Link>
                      <ConfirmDeleteButton onDelete={async () => { "use server"; await deleteServiceTypeAction(st.id); }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
