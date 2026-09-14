import { z } from "zod";

const optionalText = z.string().trim().max(2000).optional().or(z.literal(""));

export const inquirySchema = z.object({
  passengerName: z.string().trim().min(2, "Please enter your full name").max(255),
  contactNumber: z
    .string()
    .trim()
    .min(6, "Please enter a valid contact number")
    .max(32)
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  serviceTypeId: z.string().uuid().optional().or(z.literal("")).nullable(),
  selectedVehicleId: z.string().uuid().optional().or(z.literal("")).nullable(),
  pickupLocation: z.string().trim().min(2, "Pickup location is required").max(500),
  dropoffLocation: z.string().trim().min(2, "Drop-off location is required").max(500),
  scheduleDate: z.string().trim().min(1, "Please choose a date"),
  scheduleTime: z.string().trim().min(1, "Please choose a time"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const reviewSchema = z.object({
  customerName: z.string().trim().min(2, "Please enter your name").max(255),
  rating: z.coerce.number().int().min(1).max(5),
  reviewText: z.string().trim().min(10, "Please share a bit more about your experience").max(2000),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const vehicleSchema = z.object({
  name: z.string().trim().min(2).max(255),
  slug: z.string().trim().min(2).max(255).optional().or(z.literal("")),
  vehicleType: z.string().trim().max(100).optional().or(z.literal("")),
  seats: z.coerce.number().int().min(0).max(200).optional(),
  ac: z.coerce.boolean().optional(),
  luggageCapacity: z.string().trim().max(100).optional().or(z.literal("")),
  description: optionalText,
  features: z.string().trim().max(4000).optional().or(z.literal("")),
  mainImageUrl: z.string().trim().max(2000).optional().or(z.literal("")),
  featured: z.coerce.boolean().optional(),
  published: z.coerce.boolean().optional(),
  displayOrder: z.coerce.number().int().optional(),
});

export const serviceSchema = z.object({
  name: z.string().trim().min(2).max(255),
  slug: z.string().trim().min(2).max(255).optional().or(z.literal("")),
  description: optionalText,
  icon: z.string().trim().max(64).optional().or(z.literal("")),
  imageUrl: z.string().trim().max(2000).optional().or(z.literal("")),
  published: z.coerce.boolean().optional(),
  displayOrder: z.coerce.number().int().optional(),
});

export const serviceTypeSchema = z.object({
  name: z.string().trim().min(2).max(255),
  description: optionalText,
  published: z.coerce.boolean().optional(),
  displayOrder: z.coerce.number().int().optional(),
});

export const faqSchema = z.object({
  question: z.string().trim().min(3).max(500),
  answer: z.string().trim().min(3).max(4000),
  published: z.coerce.boolean().optional(),
  displayOrder: z.coerce.number().int().optional(),
});

export const bannerSchema = z.object({
  title: z.string().trim().max(255).optional().or(z.literal("")),
  description: optionalText,
  imageUrl: z.string().trim().min(1, "Banner image is required").max(2000),
  ctaText: z.string().trim().max(100).optional().or(z.literal("")),
  ctaLink: z.string().trim().max(500).optional().or(z.literal("")),
  published: z.coerce.boolean().optional(),
  displayOrder: z.coerce.number().int().optional(),
});
