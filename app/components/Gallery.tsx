"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Maximize2, Flag } from "lucide-react";
import { photoUrl } from "../data/profiles";

export function Gallery({ seed, count }: { seed: string; count: number }) {
  const photos = Array.from({ length: count }, (_, i) => `${seed}-${i + 1}`);
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);

  const go = (dir: number) =>
    setActive((a) => (a + dir + photos.length) % photos.length);

  return (
    <div>
      <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-ink-800">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={photoUrl(photos[active], 1000, 750)}
            alt="photo"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setLiked((v) => !v)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur grid place-items-center hover:bg-black/60 transition"
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-brand text-brand" : "text-white"}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur grid place-items-center hover:bg-black/60 transition">
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur grid place-items-center hover:bg-black/60 transition">
            <Flag className="w-4.5 h-4.5 text-brand-400" />
          </button>
        </div>

        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur grid place-items-center hover:bg-black/60 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur grid place-items-center hover:bg-black/60 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-white bg-black/45 backdrop-blur px-2.5 py-1 rounded-full">
          {active + 1} / {photos.length}
        </div>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
        {photos.map((p, i) => (
          <button
            key={p}
            onClick={() => setActive(i)}
            className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden ring-2 transition ${
              i === active ? "ring-brand" : "ring-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={photoUrl(p, 160, 160)}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
