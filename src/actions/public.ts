"use server";

import { db } from "@/db";
import { inquiries, reviews, serviceTypes, vehicles } from "@/db/schema";
import { inquirySchema, reviewSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type InquiryActionState = {
  error?: string;
  success?: boolean;
  whatsappData?: {
    name: string;
    phone: string;
    serviceType: string | null;
    carName: string | null;
    carSpecs: string | null;
    pickupLocation: string;
    dropoffLocation: string;
    dateTime: string;
  };
} | null;

export async function submitInquiryAction(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  const raw = {
    passengerName: formData.get("passengerName")?.toString() ?? "",
    contactNumber: formData.get("contactNumber")?.toString() ?? "",
    serviceTypeId: (formData.get("serviceTypeId")?.toString() || "") as string,
    selectedVehicleId: (formData.get("selectedVehicleId")?.toString() || "") as string,
    pickupLocation: formData.get("pickupLocation")?.toString() ?? "",
    dropoffLocation: formData.get("dropoffLocation")?.toString() ?? "",
    scheduleDate: formData.get("scheduleDate")?.toString() ?? "",
    scheduleTime: formData.get("scheduleTime")?.toString() ?? "",
  };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const data = parsed.data;

  let serviceTypeName: string | null = null;
  let serviceTypeId: string | null = null;
  if (data.serviceTypeId) {
    const [st] = await db.select().from(serviceTypes).where(eq(serviceTypes.id, data.serviceTypeId)).limit(1);
    if (st) {
      serviceTypeName = st.name;
      serviceTypeId = st.id;
    }
  }

  let vehicle: typeof vehicles.$inferSelect | null = null;
  if (data.selectedVehicleId) {
    const [v] = await db.select().from(vehicles).where(eq(vehicles.id, data.selectedVehicleId)).limit(1);
    vehicle = v ?? null;
  }

  await db.insert(inquiries).values({
    passengerName: data.passengerName,
    contactNumber: data.contactNumber,
    serviceTypeId,
    selectedVehicleId: vehicle?.id ?? null,
    pickupLocation: data.pickupLocation,
    dropoffLocation: data.dropoffLocation,
    scheduleDate: data.scheduleDate,
    scheduleTime: data.scheduleTime,
    status: "new",
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/inquiries");

  const specsParts: string[] = [];
  if (vehicle) {
    if (vehicle.vehicleType) specsParts.push(vehicle.vehicleType);
    if (vehicle.seats) specsParts.push(`${vehicle.seats} Seats`);
    specsParts.push(vehicle.ac ? "AC" : "Non-AC");
    if (vehicle.luggageCapacity) specsParts.push(vehicle.luggageCapacity);
  }

  return {
    success: true,
    whatsappData: {
      name: data.passengerName,
      phone: data.contactNumber,
      serviceType: serviceTypeName,
      carName: vehicle?.name ?? null,
      carSpecs: specsParts.length ? specsParts.join(" • ") : null,
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
      dateTime: `${data.scheduleDate} ${data.scheduleTime}`,
    },
  };
}

export type ReviewActionState = { error?: string; success?: boolean } | null;

export async function submitReviewAction(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const parsed = reviewSchema.safeParse({
    customerName: formData.get("customerName"),
    rating: formData.get("rating"),
    reviewText: formData.get("reviewText"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  await db.insert(reviews).values({
    customerName: parsed.data.customerName,
    rating: parsed.data.rating,
    reviewText: parsed.data.reviewText,
    status: "pending",
    published: false,
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");

  return { success: true };
}
