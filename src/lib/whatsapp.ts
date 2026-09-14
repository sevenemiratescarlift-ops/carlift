export function sanitizePhoneForWhatsApp(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const digits = sanitizePhoneForWhatsApp(phone);
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${digits}?${params.toString()}`;
}

export function formatScheduleDateTime(date: string, time: string): string {
  try {
    const dt = new Date(`${date}T${time}`);
    if (Number.isNaN(dt.getTime())) return `${date} ${time}`;
    return dt.toLocaleString("en-AE", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return `${date} ${time}`;
  }
}

export function buildGeneralInquiryMessage(input: {
  name: string;
  phone: string;
  serviceType?: string | null;
  pickupLocation: string;
  dropoffLocation: string;
  dateTime: string;
}): string {
  const serviceLine = input.serviceType
    ? `Service Type: ${input.serviceType}`
    : "Service Type: Not specified";

  return [
    "✨ NEW RIDE RESERVATION ✨",
    "",
    "Hello Admin, I would like to check ride availability with 7 Emirates Carlift.",
    "",
    `Passenger Name: ${input.name}`,
    `Contact Number: ${input.phone}`,
    serviceLine,
    `Pickup Location: ${input.pickupLocation}`,
    `Drop-off Location: ${input.dropoffLocation}`,
    `Schedule Date & Time: ${input.dateTime}`,
    "",
    "Please review and confirm my request.",
  ].join("\n");
}

export function buildVehicleInquiryMessage(input: {
  name: string;
  phone: string;
  carName: string;
  carSpecs: string;
  pickupLocation: string;
  dropoffLocation: string;
  dateTime: string;
}): string {
  return [
    "✨ NEW VEHICLE RESERVATION ✨",
    "",
    "Hello Admin, I would like to inquire about a vehicle with 7 Emirates Carlift.",
    "",
    `Passenger Name: ${input.name}`,
    `Contact Number: ${input.phone}`,
    `Selected Vehicle: ${input.carName}`,
    `Vehicle Specifications: ${input.carSpecs}`,
    `Pickup Location: ${input.pickupLocation}`,
    `Drop-off Location: ${input.dropoffLocation}`,
    `Schedule Date & Time: ${input.dateTime}`,
    "",
    "Please review and confirm availability and pricing.",
  ].join("\n");
}

export function buildDeveloperWhatsAppMessage(developerName: string, template?: string | null): string {
  if (template && template.trim().length > 0) return template;
  return `Hello ${developerName}, I found your work through the 7 Emirates Carlift website and would like to discuss a website/project.`;
}

