import { notFound } from "next/navigation";
import { workBySlug, workHref, works } from "@/lib/site";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkCase({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = workBySlug(slug);
  if (!work) notFound();
  const href = workHref(work);
  const chip = work.status === "live" || work.status === "beta" ? work.status : "private";

  return (
    <main className="mt-16 max-w-2xl sm:mt-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {chip} · {work.stack.join(" · ")}
      </p>
      <h1 className="font-display mt-3 text-4xl italic sm:text-5xl">{work.name}</h1>
      <p className="mt-4 text-lg leading-7 text-muted-foreground">{work.oneLiner}</p>
      {href ? (
        <p className="mt-4">
          <a className="underline decoration-border underline-offset-4 hover:text-ink" href={href} rel="noreferrer" target="_blank">
            Open the live product
          </a>
        </p>
      ) : null}

      <section className="mt-12 space-y-8 text-[16px] leading-7">
        <div>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Problem</h2>
          <p className="mt-2">{work.problem}</p>
        </div>
        <div>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">What shipped</h2>
          <p className="mt-2">{work.shipped}</p>
        </div>
        <div>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Proof</h2>
          <p className="mt-2">{work.proof}</p>
        </div>
      </section>
    </main>
  );
}
