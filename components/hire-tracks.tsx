import { offers } from "@/lib/site";

export function HireTracks() {
  return (
    <section id="engage" className="mt-20 grid gap-10 sm:grid-cols-2">
      {offers.map((offer) => (
        <article key={offer.kind}>
          <h2 className="font-display text-2xl italic">{offer.title}</h2>
          <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{offer.forWhom}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-6">
            {offer.youGet.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
