import { PageHeader, Card } from "@/components/admin/ui";
import { FaqForm } from "@/components/admin/FaqForm";
import { createFaqAction } from "@/actions/admin-catalog";

export const metadata = { title: "Add FAQ" };

export default function NewFaqPage() {
  return (
    <div>
      <PageHeader title="Add FAQ" />
      <Card>
        <FaqForm action={createFaqAction} />
      </Card>
    </div>
  );
}
