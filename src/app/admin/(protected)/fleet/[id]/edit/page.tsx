import { notFound } from "next/navigation";
import { getVehicleById, getVehicleImages } from "@/lib/data";
import { PageHeader, Card } from "@/components/admin/ui";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { updateVehicleAction } from "@/actions/admin-vehicles";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Vehicle" };

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();
  const gallery = await getVehicleImages(id);

  const boundAction = updateVehicleAction.bind(null, id);

  return (
    <div>
      <PageHeader title={`Edit ${vehicle.name}`} description="Update vehicle details, images and availability." />
      <Card>
        <VehicleForm vehicle={vehicle} gallery={gallery.map((g) => g.imageUrl)} action={boundAction} />
      </Card>
    </div>
  );
}
