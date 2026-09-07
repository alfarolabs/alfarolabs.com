import { mailto, person } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 flex flex-col gap-3 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <a href={mailto} className="hover:text-ink">
        {person.email}
      </a>
      <p className="flex gap-5">
        <a href={person.github} className="hover:text-ink">
          GitHub
        </a>
        <a href={person.x} className="hover:text-ink">
          X
        </a>
      </p>
    </footer>
  );
}
