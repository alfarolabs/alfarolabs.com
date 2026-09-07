import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HireTracks } from "@/components/hire-tracks";
import { WorkCard } from "@/components/work-card";
import { mailto, person, works } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <section className="mt-16 max-w-3xl sm:mt-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {person.studio} · {person.location}
        </p>
        <h1 className="font-display mt-3 text-[2.6rem] leading-[1.02] font-medium italic sm:text-[4.2rem]">
          {person.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-7 text-muted-foreground sm:text-[1.25rem] sm:leading-8">
          {person.sentence}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="#work">See the work</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={mailto}>Hire me</a>
          </Button>
        </div>
      </section>

      <section id="work" className="mt-20">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Work</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {works.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </section>

      <HireTracks />
    </main>
  );
}
