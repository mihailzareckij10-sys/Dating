"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Play, Images } from "lucide-react";
import type { Profile } from "../data/profiles";
import { photoUrl } from "../data/profiles";
import { VerifiedBadge } from "./icons";

export function ProfileCard({ profile, index = 0 }: { profile: Profile; index?: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
    >
      <Link href={`/profile/${profile.id}`} className="group block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ink-800 shadow-card">
          <img
            src={photoUrl(profile.photoSeed, 600, 800)}
            alt={profile.name}
            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/10" />

          {/* badges */}
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {profile.badge && (
              <span
                className={`text-[10px] font-bold tracking-wide px-2 py-1 rounded-lg ${
                  profile.badge === "PREMIUM"
                    ? "gradient-bar text-white"
                    : profile.badge === "TOP"
                    ? "bg-amber-400 text-black"
                    : "bg-emerald-400 text-black"
                }`}
              >
                {profile.badge}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked((v) => !v);
            }}
            className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md grid place-items-center hover:bg-black/55 transition"
          >
            <Heart
              className={`w-4.5 h-4.5 transition ${liked ? "fill-brand text-brand" : "text-white"}`}
            />
          </button>

          <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
            {profile.videoCount ? (
              <span className="flex items-center gap-1 text-[11px] text-white bg-black/45 backdrop-blur rounded-md px-1.5 py-0.5">
                <Play className="w-3 h-3 fill-white" /> {profile.videoCount}
              </span>
            ) : null}
            <span className="flex items-center gap-1 text-[11px] text-white bg-black/45 backdrop-blur rounded-md px-1.5 py-0.5">
              <Images className="w-3 h-3" /> {profile.photoCount}
            </span>
          </div>

          {profile.online && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
              онлайн
            </span>
          )}
        </div>

        <div className="pt-2.5 px-0.5">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{profile.name}</span>
            {profile.verified && <VerifiedBadge />}
          </div>
          <div className="flex items-center gap-1 text-[13px] text-brand-400 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">
              {profile.city}, {profile.district}
            </span>
          </div>
          <div className="text-[12px] text-white/45 mt-1">
            {profile.age} лет · {profile.height} см · {profile.bodyType}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {profile.interests.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-md bg-ink-700 text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
