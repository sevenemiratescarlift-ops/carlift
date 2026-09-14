export const SERVICE_ICON_MAP: Record<string, string> = {
  plane: "✈️",
  "map-pin": "📍",
  briefcase: "💼",
  map: "🗺️",
  car: "🚗",
  building: "🏨",
  clock: "🕐",
  shield: "🛡️",
  star: "⭐",
  users: "👥",
};

export function getServiceIcon(icon: string | null | undefined): string {
  if (!icon) return "🚘";
  return SERVICE_ICON_MAP[icon] ?? "🚘";
}
