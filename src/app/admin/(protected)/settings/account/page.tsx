import { PageHeader, Card } from "@/components/admin/ui";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const metadata = { title: "Account Settings" };

export default function AdminAccountSettingsPage() {
  return (
    <div>
      <PageHeader title="Account Settings" description="Update your admin login password." />
      <Card className="max-w-lg">
        <ChangePasswordForm />
      </Card>
    </div>
  );
}
