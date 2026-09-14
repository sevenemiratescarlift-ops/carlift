import Image from "next/image";
import Script from "next/script";
import { db } from "@/db";
import { media } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PageHeader, Card } from "@/components/admin/ui";
import { MediaUploadForm } from "@/components/admin/MediaUploadForm";
import { MediaDeleteButton } from "@/components/admin/MediaDeleteButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Media Library" };

export default async function AdminMediaPage() {
  const files = await db.select().from(media).orderBy(desc(media.createdAt));

  return (
    <div>
      <PageHeader title="Media Library" description="Upload and reuse images across vehicles, services and banners." />

      <Card className="mb-6">
        <MediaUploadForm />
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {files.length === 0 && <p className="col-span-full text-center text-slate-500">No media uploaded yet.</p>}

        {files.map((file) => (
          <Card key={file.id} className="p-2">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white/5">
              {file.fileType?.startsWith("image") ? (
                <Image
                  src={file.fileUrl}
                  alt={file.altText || file.fileName}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center text-2xl">📄</div>
              )}
            </div>

            <p
              className="mt-2 truncate text-xs text-slate-300"
              title={file.fileName}
            >
              {file.fileName}
            </p>

            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                data-copy={file.fileUrl}
                className="copy-url-btn rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-slate-300 hover:bg-white/5"
              >
                Copy URL
              </button>

              <MediaDeleteButton id={file.id} />
            </div>
          </Card>
        ))}
      </div>

      <Script
        id="media-copy-url"
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function (e) {
              const target = e.target;
              if (target && target.classList && target.classList.contains('copy-url-btn')) {
                const url = target.getAttribute('data-copy');
                if (url && navigator.clipboard) {
                  navigator.clipboard.writeText(location.origin + url);
                  target.textContent = 'Copied!';
                  setTimeout(() => { target.textContent = 'Copy URL'; }, 1500);
                }
              }
            });
          `,
        }}
      />
    </div>
  );
}