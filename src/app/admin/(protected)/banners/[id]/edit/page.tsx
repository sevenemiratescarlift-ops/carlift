import { notFound } from "next/navigation";
import { db } from "@/db";
import { banners } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageHeader, Card } from "@/components/admin/ui";
import { BannerForm } from "@/components/admin/BannerForm";
import { updateBannerAction } from "@/actions/admin-banners";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Banner" };

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [banner] = await db.select().from(banners).where(eq(banners.id, id)).limit(1);
  if (!banner) notFound();

  return (
    <div>
      <PageHeader title="Edit Banner" />
      <Card>
        <BannerForm banner={banner} action={updateBannerAction.bind(null, id)} />
      </Card>
    </div>
  );
}
