"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-ink-900">
      <div className="flex items-center gap-2 text-white/45 text-sm">
        <MapPin className="w-4 h-4 animate-pulse" /> Загружаем карту…
      </div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="py-4 space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Карта анкет</h1>
        <span className="text-[13px] text-white/45">Нажмите на фото, чтобы открыть анкету</span>
      </div>
      <div className="relative w-full h-[calc(100vh-200px)] min-h-[440px] rounded-2xl overflow-hidden border border-white/5">
        <MapView />
      </div>
    </div>
  );
}
