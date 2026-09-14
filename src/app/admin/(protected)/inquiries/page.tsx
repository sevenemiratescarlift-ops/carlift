import { db } from "@/db";
import { inquiries, serviceTypes, vehicles } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { PageHeader, Card, ConfirmDeleteButton } from "@/components/admin/ui";
import { deleteInquiryAction, updateInquiryStatusAction } from "@/actions/admin-inquiries";
import { formatDateHuman, formatTimeHuman } from "@/lib/utils";
import { InquiryStatusSelect } from "@/components/admin/InquiryStatusSelect";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ride Inquiries" };

export default async function AdminInquiriesPage() {
  const rows = await db
    .select({
      id: inquiries.id,
      passengerName: inquiries.passengerName,
      contactNumber: inquiries.contactNumber,
      pickupLocation: inquiries.pickupLocation,
      dropoffLocation: inquiries.dropoffLocation,
      scheduleDate: inquiries.scheduleDate,
      scheduleTime: inquiries.scheduleTime,
      status: inquiries.status,
      createdAt: inquiries.createdAt,
      serviceTypeName: serviceTypes.name,
      vehicleName: vehicles.name,
    })
    .from(inquiries)
    .leftJoin(serviceTypes, eq(inquiries.serviceTypeId, serviceTypes.id))
    .leftJoin(vehicles, eq(inquiries.selectedVehicleId, vehicles.id))
    .orderBy(desc(inquiries.createdAt));

  return (
    <div>
      <PageHeader title="Ride Inquiries" description="All ride requests submitted through the website, stored in PostgreSQL." />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="p-4">Passenger</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Type / Vehicle</th>
                <th className="p-4">Route</th>
                <th className="p-4">Schedule</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-slate-500">No inquiries yet.</td></tr>}
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="p-4 font-medium text-white">{row.passengerName}</td>
                  <td className="p-4 text-slate-300">{row.contactNumber}</td>
                  <td className="p-4 text-slate-300">
                    {row.vehicleName ? (
                      <span className="rounded-full bg-[#00B4D8]/15 px-2 py-1 text-xs text-[#00B4D8]">{row.vehicleName}</span>
                    ) : row.serviceTypeName ? (
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{row.serviceTypeName}</span>
                    ) : (
                      <span className="text-xs text-slate-500">General inquiry</span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-slate-400">
                    <p>From: {row.pickupLocation}</p>
                    <p>To: {row.dropoffLocation}</p>
                  </td>
                  <td className="p-4 text-slate-300">
                    {formatDateHuman(row.scheduleDate)}
                    <br />
                    {formatTimeHuman(row.scheduleTime)}
                  </td>
                  <td className="p-4">
                    <InquiryStatusSelect id={row.id} status={row.status} updateAction={updateInquiryStatusAction} />
                  </td>
                  <td className="p-4 text-right">
                    <ConfirmDeleteButton onDelete={async () => { "use server"; await deleteInquiryAction(row.id); }} />
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
