import Link from "next/link";
import Image from "next/image";
import { getBanners } from "@/lib/data";
import { PageHeader, Card, ToggleButton, ConfirmDeleteButton, ReorderButtons } from "@/components/admin/ui";
import { deleteBannerAction, reorderBannerAction, toggleBannerPublishedAction } from "@/actions/admin-banners";

export const dynamic = "force-dynamic";
export const metadata = { title: "Banners" };

export default async function AdminBannersPage() {
  const banners = await getBanners(false);

  return (
    <div>
      <PageHeader
        title="Banners"
        description="Homepage promotional banners. If none are published, the banner section is hidden automatically."
        action={<Link href="/admin/banners/new" className="rounded-full bg-[#00B4D8] px-5 py-2.5 text-sm font-bold text-slate-900">+ Add Banner</Link>}
      />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="p-4">Banner</th>
                <th className="p-4">Status</th>
                <th className="p-4">Order</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {banners.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-slate-500">No banners yet.</td></tr>}
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-white/10">
                        <Image src={banner.imageUrl} alt={banner.title || "Banner"} fill sizes="80px" className="object-cover" />
                      </div>
                      <p className="font-semibold text-white">{banner.title || "Untitled Banner"}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <ToggleButton active={banner.published} onToggle={async (next) => { "use server"; await toggleBannerPublishedAction(banner.id, next); }} />
                  </td>
                  <td className="p-4">
                    <ReorderButtons
                      onUp={async () => { "use server"; await reorderBannerAction(banner.id, "up"); }}
                      onDown={async () => { "use server"; await reorderBannerAction(banner.id, "down"); }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/banners/${banner.id}/edit`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5">
                        Edit
                      </Link>
                      <ConfirmDeleteButton onDelete={async () => { "use server"; await deleteBannerAction(banner.id); }} />
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
