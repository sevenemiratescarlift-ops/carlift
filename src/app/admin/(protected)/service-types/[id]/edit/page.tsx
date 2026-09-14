import { notFound } from "next/navigation";
import { db } from "@/db";
import { serviceTypes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageHeader, Card } from "@/components/admin/ui";
import { ServiceTypeForm } from "@/components/admin/ServiceTypeForm";
import { updateServiceTypeAction } from "@/actions/admin-catalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Service Type" };

export default async function EditServiceTypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [serviceType] = await db.select().from(serviceTypes).where(eq(serviceTypes.id, id)).limit(1);
  if (!serviceType) notFound();

  return (
    <div>
      <PageHeader title={`Edit ${serviceType.name}`} />
      <Card>
        <ServiceTypeForm serviceType={serviceType} action={updateServiceTypeAction.bind(null, id)} />
      </Card>
    </div>
  );
}
