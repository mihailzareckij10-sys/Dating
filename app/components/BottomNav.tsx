"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, Map, User } from "lucide-react";

const items = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/catalog", label: "Каталог", icon: LayoutGrid },
  { href: "/favorites", label: "Избранное", icon: Heart },
  { href: "/map", label: "Карта", icon: Map },
  { href: "/account", label: "Профиль", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-white/5 bg-ink-950/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/"));
          return (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center justify-center gap-1 text-[11px]"
            >
              <Icon
                className={`w-5 h-5 transition ${active ? "text-brand-400" : "text-white/45"}`}
                strokeWidth={active ? 2.4 : 2}
              />
              <span className={active ? "text-brand-400 font-medium" : "text-white/45"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
