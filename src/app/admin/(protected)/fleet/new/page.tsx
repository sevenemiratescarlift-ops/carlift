import { PageHeader, Card } from "@/components/admin/ui";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { createVehicleAction } from "@/actions/admin-vehicles";

export const metadata = { title: "Add Vehicle" };

export default function NewVehiclePage() {
  return (
    <div>
      <PageHeader title="Add Vehicle" description="Create a new vehicle for the public fleet page." />
      <Card>
        <VehicleForm action={createVehicleAction} />
      </Card>
    </div>
  );
}
