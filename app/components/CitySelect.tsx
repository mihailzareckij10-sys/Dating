"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Search } from "lucide-react";
import { cities } from "../data/profiles";

export function CitySelect() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("Москва");
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const filtered = cities.filter((c) =>
    c.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 opacity-95 hover:opacity-100 transition"
      >
        <Globe className="w-3.5 h-3.5" />
        {city}
        <ChevronDown className={`w-3 h-3 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-64 rounded-xl bg-ink-900 border border-white/10 shadow-card overflow-hidden">
          <div className="relative p-2 border-b border-white/5">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти город…"
              className="w-full h-9 rounded-lg bg-ink-800 border border-white/5 pl-9 pr-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-brand/60 transition"
            />
          </div>
          <div className="max-h-64 overflow-y-auto no-scrollbar py-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-sm text-white/40">Ничего не найдено</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition ${
                    c === city
                      ? "bg-brand/15 text-brand-400 font-medium"
                      : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  {c}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
