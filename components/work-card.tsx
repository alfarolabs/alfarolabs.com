import Link from "next/link";
import type { Work } from "@/lib/site";

export function WorkCard({ work }: { work: Work }) {
  const chip = work.status === "live" || work.status === "beta" ? work.status : "private";

  return (
    <Link
      href={`/work/${work.slug}`}
      className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-ink/20"
    >
      <p className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{work.stack[0]}</span>
        <span>{chip}</span>
      </p>
      <h2 className="font-display mt-3 text-2xl italic">{work.name}</h2>
      <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{work.oneLiner}</p>
    </Link>
  );
}
