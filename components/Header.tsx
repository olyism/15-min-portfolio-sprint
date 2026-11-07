"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Close, Menu } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = { label: string; href: string };

export function Header({ name, nav }: { name: string; nav: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border-subtle bg-bg/75 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto box-content flex h-16 max-w-content items-center justify-between gap-6 px-gutter">
        <Link href="/" className="text-small font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="rounded-pill px-3 py-1.5 text-small text-fg-muted transition-colors hover:text-fg aria-[current=page]:text-fg aria-[current=page]:font-medium"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="ml-3" />
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-pill md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border-subtle px-gutter pt-4 pb-8 md:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((item, i) => (
            <li key={item.href} className="enter" style={{ "--i": i } as React.CSSProperties}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn("block py-2.5 text-title font-semibold text-fg-muted aria-[current=page]:text-fg")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle className="mt-6" />
      </div>
    </header>
  );
}
