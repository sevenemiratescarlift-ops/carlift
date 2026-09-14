import Link from "next/link";
import { getDashboardStats, getRecentInquiries } from "@/lib/data";
import { PageHeader, Card } from "@/components/admin/ui";
import { formatDateHuman, formatTimeHuman } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [stats, recentInquiries] = await Promise.all([getDashboardStats(), getRecentInquiries(8)]);

  const cards = [
    { label: "Total Vehicles", value: stats.totalVehicles, icon: "🚘", href: "/admin/fleet" },
    { label: "Published Vehicles", value: stats.publishedVehicles, icon: "✅", href: "/admin/fleet" },
    { label: "Featured Vehicles", value: stats.featuredVehicles, icon: "⭐", href: "/admin/fleet" },
    { label: "Total Inquiries", value: stats.totalInquiries, icon: "📨", href: "/admin/inquiries" },
    { label: "New Inquiries", value: stats.newInquiries, icon: "🆕", href: "/admin/inquiries" },
    { label: "Pending Reviews", value: stats.pendingReviews, icon: "⏳", href: "/admin/reviews" },
    { label: "Published Services", value: stats.publishedServices, icon: "🛎️", href: "/admin/services" },
    { label: "Published FAQs", value: stats.publishedFaqs, icon: "❓", href: "/admin/faqs" },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description="Live statistics pulled directly from PostgreSQL." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="transition hover:border-[#00B4D8]/50">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-3xl font-extrabold text-white">{card.value}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">{card.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-[#00B4D8] hover:underline">
              View All →
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-2 pr-4">Passenger</th>
                  <th className="pb-2 pr-4">Contact</th>
                  <th className="pb-2 pr-4">Schedule</th>
                  <th className="pb-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentInquiries.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">
                      No inquiries yet.
                    </td>
                  </tr>
                )}
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="py-3 pr-4 font-medium text-white">{inquiry.passengerName}</td>
                    <td className="py-3 pr-4 text-slate-300">{inquiry.contactNumber}</td>
                    <td className="py-3 pr-4 text-slate-300">
                      {formatDateHuman(inquiry.scheduleDate)} · {formatTimeHuman(inquiry.scheduleTime)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs capitalize text-slate-200">
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
