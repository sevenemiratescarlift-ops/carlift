import Link from "next/link";
import Image from "next/image";
import { getVehicles } from "@/lib/data";
import { PageHeader, Card, ToggleButton, ConfirmDeleteButton, ReorderButtons } from "@/components/admin/ui";
import {
  deleteVehicleAction,
  reorderVehicleAction,
  toggleVehicleFeaturedAction,
  toggleVehiclePublishedAction,
} from "@/actions/admin-vehicles";

export const dynamic = "force-dynamic";
export const metadata = { title: "Fleet Management" };

export default async function AdminFleetPage() {
  const vehicles = await getVehicles(false);

  return (
    <div>
      <PageHeader
        title="Fleet Management"
        description="Add, edit, publish and reorder vehicles. No prices are shown publicly."
        action={
          <Link href="/admin/fleet/new" className="rounded-full bg-[#00B4D8] px-5 py-2.5 text-sm font-bold text-slate-900">
            + Add Vehicle
          </Link>
        }
      />

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="p-4">Vehicle</th>
                <th className="p-4">Type</th>
                <th className="p-4">Seats</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4">Order</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    No vehicles yet. Add your first vehicle to get started.
                  </td>
                </tr>
              )}
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-white/10">
                        {vehicle.mainImageUrl && (
                          <Image src={vehicle.mainImageUrl} alt={vehicle.name} fill sizes="64px" className="object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{vehicle.name}</p>
                        <p className="text-xs text-slate-500">/{vehicle.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{vehicle.vehicleType ?? "-"}</td>
                  <td className="p-4 text-slate-300">{vehicle.seats ?? "-"}</td>
                  <td className="p-4">
                    <ToggleButton
                      active={vehicle.featured}
                      activeLabel="Featured"
                      inactiveLabel="Standard"
                      onToggle={async (next) => {
                        "use server";
                        await toggleVehicleFeaturedAction(vehicle.id, next);
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <ToggleButton
                      active={vehicle.published}
                      onToggle={async (next) => {
                        "use server";
                        await toggleVehiclePublishedAction(vehicle.id, next);
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <ReorderButtons
                      onUp={async () => {
                        "use server";
                        await reorderVehicleAction(vehicle.id, "up");
                      }}
                      onDown={async () => {
                        "use server";
                        await reorderVehicleAction(vehicle.id, "down");
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/fleet/${vehicle.id}/edit`}
                        className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5"
                      >
                        Edit
                      </Link>
                      <ConfirmDeleteButton
                        onDelete={async () => {
                          "use server";
                          await deleteVehicleAction(vehicle.id);
                        }}
                      />
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
