import { PageHeader, Card } from "@/components/admin/ui";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { createServiceAction } from "@/actions/admin-catalog";

export const metadata = { title: "Add Service" };

export default function NewServicePage() {
  return (
    <div>
      <PageHeader title="Add Service" />
      <Card>
        <ServiceForm action={createServiceAction} />
      </Card>
    </div>
  );
}
