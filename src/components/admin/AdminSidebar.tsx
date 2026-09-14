"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_GROUPS: { label: string; items: { href: string; label: string; icon: string }[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: "📊" }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/fleet", label: "Fleet", icon: "🚘" },
      { href: "/admin/services", label: "Services", icon: "🛎️" },
      { href: "/admin/service-types", label: "Service Types", icon: "🏷️" },
      { href: "/admin/banners", label: "Banners", icon: "🖼️" },
      { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
      { href: "/admin/faqs", label: "FAQs", icon: "❓" },
      { href: "/admin/media", label: "Media", icon: "📁" },
    ],
  },
  {
    label: "Operations",
    items: [{ href: "/admin/inquiries", label: "Inquiries", icon: "📨" }],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/settings", label: "Branding & SEO", icon: "🏢" },
      { href: "/admin/settings/homepage", label: "Homepage", icon: "🏠" },
      { href: "/admin/settings/theme", label: "Theme & Colors", icon: "🎨" },
      { href: "/admin/settings/contact", label: "Contact", icon: "📞" },
      { href: "/admin/settings/developer", label: "Developer Credit", icon: "👨‍💻" },
      { href: "/admin/settings/account", label: "Account", icon: "🔐" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#0077B6] to-[#00B4D8] font-bold text-white">
          7E
        </span>
        <div>
          <p className="text-sm font-bold text-white">7 Emirates Carlift</p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">{group.label}</p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active ? "bg-[#00B4D8]/15 text-[#00B4D8]" : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <Link href="/" target="_blank" className="text-xs text-slate-400 hover:text-[#00B4D8]">
          ← View Public Website
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-[#070c1a] lg:block">
        {content}
      </aside>

      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#070c1a] px-4 py-3 lg:hidden">
        <span className="text-sm font-bold text-white">7 Emirates Carlift Admin</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)}>
          <aside className="h-full w-72 bg-[#070c1a]" onClick={(e) => e.stopPropagation()}>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
