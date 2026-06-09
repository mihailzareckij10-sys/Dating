"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { profiles, photoUrl } from "../data/profiles";
import { VerifiedBadge } from "./icons";

// Top profiles — premium / TOP first, then the rest.
const top = [...profiles].sort((a, b) => {
  const score = (p: (typeof profiles)[number]) =>
    (p.badge === "TOP" ? 3 : 0) + (p.premium ? 2 : 0) + (p.online ? 1 : 0);
  return score(b) - score(a);
});

function Card({ p, i }: { p: (typeof profiles)[number]; i: number }) {
  return (
    <Link
      href={`/profile/${p.id}`}
      className="relative shrink-0 w-[150px] sm:w-[190px] h-[200px] sm:h-[240px] rounded-2xl overflow-hidden group"
    >
      <img
        src={photoUrl(p.photoSeed, 400, 560)}
        alt={p.name}
        className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
      <span className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] font-bold tracking-wide px-2 py-1 rounded-lg gradient-bar text-white shadow-glow">
        <Flame className="w-3 h-3" /> ТОП {i + 1}
      </span>
      {p.online && (
        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black/30" />
      )}
      <div className="absolute left-3 bottom-2.5">
        <div className="flex items-center gap-1 text-white font-bold leading-tight drop-shadow">
          {p.name}, {p.age}
          {p.verified && <VerifiedBadge className="w-3.5 h-3.5" />}
        </div>
        <div className="text-white/80 text-[11px] font-medium truncate max-w-[130px]">
          {p.district}
        </div>
      </div>
    </Link>
  );
}

export function TopRail() {
  const loop = [...top, ...top]; // duplicate for seamless marquee
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-5 h-5 text-brand-400" />
        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">ТОП анкет</h2>
        <span className="text-[11px] font-semibold text-white/40 ml-1">недели</span>
      </div>

      <div className="relative -mx-3 sm:mx-0 overflow-hidden group">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-ink-950 to-transparent" />

        <div className="flex gap-3 px-3 sm:px-0 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <Card key={`${p.id}-${i}`} p={p} i={i % top.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
