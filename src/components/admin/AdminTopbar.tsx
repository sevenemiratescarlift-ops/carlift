import { logoutAction } from "@/actions/auth";

export function AdminTopbar({ name }: { name: string }) {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#050914]/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">Welcome back</p>
        <p className="text-sm font-semibold text-white">{name}</p>
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </form>
    </header>
  );
}
