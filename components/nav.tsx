import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { mailto, person } from "@/lib/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/method", label: "Method" },
  { href: "/engage", label: "Engage" },
] as const;

export function Nav() {
  return (
    <header className="flex items-baseline justify-between gap-6">
      <Link href="/" className="font-display text-[1.15rem] italic text-ink">
        {person.studio}
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[13px] tracking-wide text-muted-foreground">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-ink">
            {link.label}
          </Link>
        ))}
        <a href={mailto} className="hover:text-ink">
          Email
        </a>
        <ModeToggle />
      </nav>
    </header>
  );
}
