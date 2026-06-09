import Link from "next/link";
import { MapPin } from "lucide-react";
import { profiles } from "../data/profiles";
import { VerifiedBadge } from "../components/icons";

export default function MapPage() {
  const mapSrc =
    "https://www.openstreetmap.org/export/embed.html?bbox=37.45%2C55.66%2C37.72%2C55.84&layer=mapnik";
  return (
    <div className="py-4 space-y-4">
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Карта анкет</h1>
      <div className="relative rounded-2xl overflow-hidden border border-white/5">
        <iframe
          title="map"
          src={mapSrc}
          className="w-full h-[420px] grayscale-[0.3] contrast-110"
          loading="lazy"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {profiles.slice(0, 6).map((p) => (
          <Link
            key={p.id}
            href={`/profile/${p.id}`}
            className="flex items-center gap-3 rounded-2xl bg-ink-900 border border-white/5 p-3 hover:border-brand/40 transition"
          >
            <div className="w-12 h-12 rounded-full bg-ink-700 grid place-items-center text-brand-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-semibold">
                {p.name} {p.verified && <VerifiedBadge />}
              </div>
              <div className="text-[13px] text-white/45">
                {p.district} · {p.metro[0]}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
