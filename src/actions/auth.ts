"use server";

import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { clearSessionCookie, getSession, setSessionCookie } from "@/lib/auth/session";
import { changePasswordSchema, loginSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export type ActionState = { error?: string; success?: string } | null;

export async function loginAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { email, password } = parsed.data;

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase())).limit(1);
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password" };
  }

  await setSessionCookie({ sub: user.id, email: user.email, name: user.name });
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  "use server";
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function changePasswordAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession();
  if (!session) {
    return { error: "You must be logged in." };
  }

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, session.sub)).limit(1);
  if (!user) {
    return { error: "Account not found." };
  }

  const valid = await verifyPassword(parsed.data.currentPassword, user.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  const newHash = await hashPassword(parsed.data.newPassword);
  await db.update(adminUsers).set({ passwordHash: newHash, updatedAt: new Date() }).where(eq(adminUsers.id, user.id));

  return { success: "Password updated successfully." };
}
