"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "../data/profiles";

export function CategoryChips() {
  const [active, setActive] = useState("");
  return (
    <div className="-mx-3 sm:mx-0 px-3 sm:px-0">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button className="shrink-0 h-9 px-3.5 rounded-full gradient-bar text-white text-sm font-semibold flex items-center gap-1.5 shadow-glow">
          <SlidersHorizontal className="w-4 h-4" /> Фильтр
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`shrink-0 h-9 px-3.5 rounded-full text-sm font-medium border transition ${
              active === c
                ? "bg-white text-ink-950 border-white"
                : "bg-ink-800 text-white/75 border-white/5 hover:border-white/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
