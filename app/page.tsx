import Link from "next/link";
import { StoryRail } from "./components/StoryRail";
import { CategoryChips } from "./components/CategoryChips";
import { ProfileCard } from "./components/ProfileCard";
import { profiles } from "./data/profiles";

export default function HomePage() {
  const online = profiles.filter((p) => p.online).length * 162 + 27;

  return (
    <div className="py-4 space-y-5">
      <CategoryChips />
      <StoryRail />

      <div className="flex items-end justify-between pt-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Анкеты рядом
          </h1>
          <p className="text-sm text-white/45 mt-0.5">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {online.toLocaleString("ru-RU")} онлайн
            </span>
          </p>
        </div>
        <Link href="/catalog" className="text-sm text-brand-400 font-medium hover:underline">
          Все
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {profiles.map((p, i) => (
          <ProfileCard key={p.id} profile={p} index={i} />
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/catalog"
          className="block text-center w-full sm:w-auto sm:inline-block sm:px-8 py-3 rounded-xl gradient-bar text-white font-semibold shadow-glow hover:opacity-95 transition"
        >
          Показать все анкеты
        </Link>
      </div>
    </div>
  );
}
