import { PageHeader, Card } from "@/components/admin/ui";
import { ServiceTypeForm } from "@/components/admin/ServiceTypeForm";
import { createServiceTypeAction } from "@/actions/admin-catalog";

export const metadata = { title: "Add Service Type" };

export default function NewServiceTypePage() {
  return (
    <div>
      <PageHeader title="Add Service Type" />
      <Card>
        <ServiceTypeForm action={createServiceTypeAction} />
      </Card>
    </div>
  );
}
