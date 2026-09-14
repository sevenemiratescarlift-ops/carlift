import { notFound } from "next/navigation";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageHeader, Card } from "@/components/admin/ui";
import { FaqForm } from "@/components/admin/FaqForm";
import { updateFaqAction } from "@/actions/admin-catalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit FAQ" };

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [faq] = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);
  if (!faq) notFound();

  return (
    <div>
      <PageHeader title="Edit FAQ" />
      <Card>
        <FaqForm faq={faq} action={updateFaqAction.bind(null, id)} />
      </Card>
    </div>
  );
}
