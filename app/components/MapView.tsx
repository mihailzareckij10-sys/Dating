"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { profiles, photoUrl } from "../data/profiles";

export default function MapView() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let map: any;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current) return;

      map = L.map(ref.current, {
        center: [55.75, 37.6],
        zoom: 11,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);

      profiles.forEach((p) => {
        const img = photoUrl(p.photoSeed, 120, 120);
        const html = `
          <div class="lumi-pin">
            <img src="${img}" alt="${p.name}" />
            ${p.online ? '<span class="lumi-dot"></span>' : ""}
            <span class="lumi-name">${p.name}, ${p.age}</span>
          </div>`;
        const icon = L.divIcon({
          html,
          className: "lumi-pin-wrap",
          iconSize: [54, 54],
          iconAnchor: [27, 27],
        });
        L.marker([p.lat, p.lng], { icon, title: p.name })
          .addTo(map)
          .on("click", () => router.push(`/profile/${p.id}`));
      });

      // make sure tiles render after layout
      setTimeout(() => map && map.invalidateSize(), 200);
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [router]);

  return <div ref={ref} className="absolute inset-0" />;
}
