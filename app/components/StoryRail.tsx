"use client";

import { motion } from "framer-motion";
import { photoUrl } from "../data/profiles";
import { stories } from "../data/profiles";

export function StoryRail() {
  return (
    <div className="-mx-3 sm:mx-0 px-3 sm:px-0">
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {stories.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="relative shrink-0 w-[160px] sm:w-[200px] h-[112px] sm:h-[128px] rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={photoUrl(s.seed, 400, 260)}
              alt={s.name}
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-55 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute left-3 bottom-2.5">
              <div className="text-white font-bold leading-tight drop-shadow">{s.name}</div>
              <div className="text-white/85 text-[11px] font-medium">{s.tag}</div>
            </div>
            <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black/30" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
