import Link from "next/link";
import { getFaqs } from "@/lib/data";
import { PageHeader, Card, ToggleButton, ConfirmDeleteButton, ReorderButtons } from "@/components/admin/ui";
import { deleteFaqAction, reorderFaqAction, toggleFaqPublishedAction } from "@/actions/admin-catalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "FAQs" };

export default async function AdminFaqsPage() {
  const faqs = await getFaqs(false);

  return (
    <div>
      <PageHeader
        title="FAQs"
        description="Manage frequently asked questions shown on the public FAQ page and homepage."
        action={<Link href="/admin/faqs/new" className="rounded-full bg-[#00B4D8] px-5 py-2.5 text-sm font-bold text-slate-900">+ Add FAQ</Link>}
      />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="p-4">Question</th>
                <th className="p-4">Status</th>
                <th className="p-4">Order</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {faqs.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-slate-500">No FAQs yet.</td></tr>}
              {faqs.map((faq) => (
                <tr key={faq.id}>
                  <td className="p-4">
                    <p className="font-semibold text-white">{faq.question}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">{faq.answer}</p>
                  </td>
                  <td className="p-4">
                    <ToggleButton active={faq.published} onToggle={async (next) => { "use server"; await toggleFaqPublishedAction(faq.id, next); }} />
                  </td>
                  <td className="p-4">
                    <ReorderButtons
                      onUp={async () => { "use server"; await reorderFaqAction(faq.id, "up"); }}
                      onDown={async () => { "use server"; await reorderFaqAction(faq.id, "down"); }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/faqs/${faq.id}/edit`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5">
                        Edit
                      </Link>
                      <ConfirmDeleteButton onDelete={async () => { "use server"; await deleteFaqAction(faq.id); }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
