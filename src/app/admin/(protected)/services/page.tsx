import Link from "next/link";
import { getServices } from "@/lib/data";
import { PageHeader, Card, ToggleButton, ConfirmDeleteButton, ReorderButtons } from "@/components/admin/ui";
import { deleteServiceAction, reorderServiceAction, toggleServicePublishedAction } from "@/actions/admin-catalog";
import { getServiceIcon } from "@/components/site/icon-map";

export const dynamic = "force-dynamic";
export const metadata = { title: "Services Management" };

export default async function AdminServicesPage() {
  const services = await getServices(false);

  return (
    <div>
      <PageHeader
        title="Services Management"
        description="Manage the transportation services shown on your website."
        action={
          <Link href="/admin/services/new" className="rounded-full bg-[#00B4D8] px-5 py-2.5 text-sm font-bold text-slate-900">
            + Add Service
          </Link>
        }
      />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
                <th className="p-4">Order</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-slate-500">No services yet.</td></tr>
              )}
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-lg">{getServiceIcon(service.icon)}</span>
                      <div>
                        <p className="font-semibold text-white">{service.name}</p>
                        <p className="text-xs text-slate-500">/{service.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <ToggleButton
                      active={service.published}
                      onToggle={async (next) => { "use server"; await toggleServicePublishedAction(service.id, next); }}
                    />
                  </td>
                  <td className="p-4">
                    <ReorderButtons
                      onUp={async () => { "use server"; await reorderServiceAction(service.id, "up"); }}
                      onDown={async () => { "use server"; await reorderServiceAction(service.id, "down"); }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/services/${service.id}/edit`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5">
                        Edit
                      </Link>
                      <ConfirmDeleteButton onDelete={async () => { "use server"; await deleteServiceAction(service.id); }} />
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
