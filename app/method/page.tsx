import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    n: "01",
    title: "Model the domain in types",
    body: "Name the thing the software is about before anyone writes a screen. Illegal states stay out of the type.",
  },
  {
    n: "02",
    title: "Let agents write against that model",
    body: "Agents implement. They do not invent a second product. The types are the spec.",
  },
  {
    n: "03",
    title: "Prove it on the real app",
    body: "A passing unit suite is not the bar. Drive the running product. Screenshot. Fail on the real path.",
  },
  {
    n: "04",
    title: "You review the interaction, then we ship",
    body: "You see the screen and the copy. Then it lands. No silent merge of a hire page or a checkout flow.",
  },
] as const;

export default function MethodPage() {
  return (
    <main className="mt-16 max-w-2xl sm:mt-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Method</p>
      <h1 className="font-display mt-3 text-4xl italic sm:text-5xl">How the work runs</h1>
      <p className="mt-4 text-lg leading-7 text-muted-foreground">
        Agentic engineering is the production system. The product is still the product.
      </p>
      <ol className="mt-12 space-y-10">
        {steps.map((step) => (
          <li key={step.n}>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{step.n}</p>
            <h2 className="font-display mt-2 text-2xl italic">{step.title}</h2>
            <p className="mt-2 text-[16px] leading-7 text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12">
        <Button asChild size="lg">
          <Link href="/engage">Hire me</Link>
        </Button>
      </div>
    </main>
  );
}
