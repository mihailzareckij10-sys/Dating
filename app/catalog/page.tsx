import { CategoryChips } from "../components/CategoryChips";
import { ProfileCard } from "../components/ProfileCard";
import { profiles } from "../data/profiles";

export default function CatalogPage() {
  return (
    <div className="py-4 space-y-5">
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Каталог анкет</h1>
      <CategoryChips />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...profiles, ...profiles].map((p, i) => (
          <ProfileCard key={`${p.id}-${i}`} profile={p} index={i} />
        ))}
      </div>
    </div>
  );
}
