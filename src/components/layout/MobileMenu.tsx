"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "./Header";

type MobileMenuProps = {
  items: NavItem[];
  discordUrl: string;
  discordLabel: string;
  localeHref: string;
  localeLabel: string;
  localeAria: string;
  otherLocale: string;
  navLabel: string;
  openLabel: string;
  closeLabel: string;
};

export function MobileMenu({
  items,
  discordUrl,
  discordLabel,
  localeHref,
  localeLabel,
  localeAria,
  otherLocale,
  navLabel,
  openLabel,
  closeLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-white shadow-lg"
      >
        <nav aria-label={navLabel} className="container-x py-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-mist"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white"
            >
              {discordLabel}
            </a>
            <a
              href={localeHref}
              hrefLang={otherLocale}
              aria-label={localeAria}
              className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold text-ink"
            >
              {localeLabel}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
