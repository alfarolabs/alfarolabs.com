import { workHref, type Work } from "@/lib/site";

export function WorkCard({ work }: { work: Work }) {
  const href = workHref(work);
  const chip = work.status === "live" || work.status === "beta" ? work.status : "private";
  const body = (
    <>
      <p className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{work.stack[0]}</span>
        <span>{chip}</span>
      </p>
      <h2 className="font-display mt-3 text-2xl italic">{work.name}</h2>
      <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{work.oneLiner}</p>
    </>
  );

  const className =
    "block rounded-xl border border-border bg-card p-5 transition-colors hover:border-ink/20";

  if (href) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {body}
      </a>
    );
  }

  return <article className={className}>{body}</article>;
}
