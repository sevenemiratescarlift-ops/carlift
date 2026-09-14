import { PageHeader, Card } from "@/components/admin/ui";
import { BannerForm } from "@/components/admin/BannerForm";
import { createBannerAction } from "@/actions/admin-banners";

export const metadata = { title: "Add Banner" };

export default function NewBannerPage() {
  return (
    <div>
      <PageHeader title="Add Banner" />
      <Card>
        <BannerForm action={createBannerAction} />
      </Card>
    </div>
  );
}
