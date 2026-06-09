import { ProfileCard } from "../components/ProfileCard";
import { profiles } from "../data/profiles";

export default function FavoritesPage() {
  const favs = profiles.filter((p) => p.premium || p.badge === "TOP");
  return (
    <div className="py-4 space-y-5">
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Избранное</h1>
      <p className="text-sm text-white/45">Анкеты, которые вы сохранили.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {favs.map((p, i) => (
          <ProfileCard key={p.id} profile={p} index={i} />
        ))}
      </div>
    </div>
  );
}
