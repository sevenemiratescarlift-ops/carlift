import { notFound } from "next/navigation";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageHeader, Card } from "@/components/admin/ui";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { updateServiceAction } from "@/actions/admin-catalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Service" };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [service] = await db.select().from(services).where(eq(services.id, id)).limit(1);
  if (!service) notFound();

  return (
    <div>
      <PageHeader title={`Edit ${service.name}`} />
      <Card>
        <ServiceForm service={service} action={updateServiceAction.bind(null, id)} />
      </Card>
    </div>
  );
}
