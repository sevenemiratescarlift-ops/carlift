import type { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "Admin Panel | 7 Emirates Carlift",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#050914] text-slate-100">{children}</div>;
}
