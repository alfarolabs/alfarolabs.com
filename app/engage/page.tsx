import { Button } from "@/components/ui/button";
import { HireTracks } from "@/components/hire-tracks";
import { mailto } from "@/lib/site";

export default function EngagePage() {
  return (
    <main className="mt-16 sm:mt-20">
      <section className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Engage</p>
        <h1 className="font-display mt-3 text-4xl italic sm:text-5xl">Contract or lead</h1>
        <p className="mt-4 text-lg leading-7 text-muted-foreground">
          Email is enough. Say what you need shipped, or the team you want led.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <a href={mailto}>Email Carlos</a>
          </Button>
        </div>
      </section>
      <HireTracks />
    </main>
  );
}
