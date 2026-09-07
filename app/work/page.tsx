import { WorkCard } from "@/components/work-card";
import { works } from "@/lib/site";

export default function WorkIndex() {
  return (
    <main>
      <section className="mt-16 max-w-3xl sm:mt-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Work</p>
        <h1 className="font-display mt-3 text-4xl italic sm:text-5xl">Shipped products</h1>
        <p className="mt-4 max-w-xl text-lg leading-7 text-muted-foreground">
          Live production tools, plus one small PWA on the same stack as this site.
        </p>
      </section>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </main>
  );
}
