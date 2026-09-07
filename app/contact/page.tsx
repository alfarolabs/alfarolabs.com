import { Button } from "@/components/ui/button";
import { mailto, person } from "@/lib/site";

export default function ContactPage() {
  return (
    <main className="mt-16 max-w-2xl sm:mt-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Contact</p>
      <h1 className="font-display mt-3 text-4xl italic sm:text-5xl">Email is enough</h1>
      <p className="mt-4 text-lg leading-7 text-muted-foreground">
        Say what you need shipped, or the team you want led. I read mail at {person.email}.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <a href={mailto}>{person.email}</a>
        </Button>
      </div>
    </main>
  );
}
