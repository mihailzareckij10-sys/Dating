import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MessageCircle,
  ThumbsUp,
  ChevronRight,
  Heart,
  Send,
  ShieldCheck,
  Calendar,
  Languages,
  Sparkles,
} from "lucide-react";
import { getProfile, profiles } from "../../data/profiles";
import { Gallery } from "../../components/Gallery";
import { VerifiedBadge } from "../../components/icons";

export function generateStaticParams() {
  return profiles.map((p) => ({ id: p.id }));
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = getProfile(params.id);
  if (!profile) notFound();

  const bbox = `${profile.lng - 0.04}%2C${profile.lat - 0.02}%2C${
    profile.lng + 0.04
  }%2C${profile.lat + 0.02}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${profile.lat}%2C${profile.lng}`;

  const params2: [string, string][] = [
    ["Номер анкеты", `№${10000 + Number(profile.id) * 837}`],
    ["Возраст", `${profile.age}`],
    ["Рост", `${profile.height} см`],
    ["Вес", `${profile.weight} кг`],
    ["Телосложение", profile.bodyType],
    ["Цвет волос", profile.hair],
    ["Знак зодиака", profile.zodiac],
    ["Образование", profile.education],
    ["Курение", profile.smoking],
    ["Город", profile.city],
    ["Район", profile.district],
    ["Обновлено", profile.updated],
  ];

  return (
    <div className="py-4">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[13px] text-white/40 mb-3 flex-wrap">
        <Link href="/" className="hover:text-white/70">Главная</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{profile.city}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{profile.district}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white/70">{profile.name}</span>
      </nav>

      <div className="flex items-center gap-2 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {profile.name}, {profile.age} — {profile.headline}
        </h1>
        {profile.verified && <VerifiedBadge className="w-5 h-5" />}
      </div>
      <div className="flex items-center gap-3 mt-1 text-[13px]">
        <span className="text-brand-400">
          {profile.city}, {profile.district}
        </span>
        <span className="flex items-center gap-1 text-white/45">
          <MessageCircle className="w-4 h-4" /> {profile.reviews.length}
        </span>
        {profile.online && (
          <span className="flex items-center gap-1.5 text-white/55">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> онлайн
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-5 mt-4">
        {/* LEFT */}
        <div className="space-y-5">
          <Gallery seed={profile.photoSeed} count={profile.photoCount} />

          {/* Mobile contact card — shown only on small screens */}
          <div className="lg:hidden rounded-2xl bg-ink-900 border border-white/5 p-4 space-y-3">
            <button className="w-full h-12 rounded-xl gradient-bar text-white font-semibold shadow-glow flex items-center justify-center gap-2 active:opacity-90 transition">
              <Send className="w-4.5 h-4.5" /> Написать сообщение
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="h-11 rounded-xl bg-ink-800 border border-white/5 font-medium flex items-center justify-center gap-2 active:border-brand/40 transition">
                <Heart className="w-4 h-4" /> В избранное
              </button>
              <button className="h-11 rounded-xl bg-ink-800 border border-white/5 font-medium flex items-center justify-center gap-2 active:border-brand/40 transition">
                <Calendar className="w-4 h-4" /> Встреча
              </button>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-white/70 mb-2">Ищу</div>
              <div className="flex flex-wrap gap-1.5">
                {profile.lookingFor.map((g) => (
                  <span
                    key={g}
                    className="text-[12px] px-2.5 py-1 rounded-lg bg-brand/15 text-brand-400 border border-brand/20"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-white/50 pt-1">
              <ShieldCheck className="w-4 h-4 text-verify shrink-0" />
              Анкета прошла верификацию по фото и документу.
            </div>
          </div>

          {/* About */}
          <section className="rounded-2xl bg-ink-900 border border-white/5 p-5">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" /> О себе
            </h2>
            <p className="text-white/75 leading-relaxed text-[15px]">{profile.about}</p>
          </section>

          {/* Params */}
          <section className="rounded-2xl bg-ink-900 border border-white/5 p-5">
            <h2 className="text-lg font-bold mb-4">Параметры</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0.5">
              {params2.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between py-2.5 border-b border-white/5 text-[14px]"
                >
                  <span className="text-white/40">{k}</span>
                  <span className="font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[13px] text-white/45">
              <Languages className="w-4 h-4" />
              {profile.languages.join(", ")}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {profile.interests.map((t) => (
                <span
                  key={t}
                  className="text-[12px] px-2.5 py-1 rounded-lg bg-ink-700 text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Map */}
          <section className="rounded-2xl bg-ink-900 border border-white/5 p-5">
            <h2 className="text-lg font-bold mb-4">На карте</h2>
            <div className="relative rounded-xl overflow-hidden border border-white/5">
              <iframe
                title="map"
                src={mapSrc}
                className="w-full h-64 grayscale-[0.3] contrast-110"
                loading="lazy"
              />
            </div>
            <p className="text-[12px] text-white/40 mt-2">
              Примерное расположение. Точный адрес — после взаимного мэтча.
            </p>
          </section>

          {/* Reviews */}
          <section className="rounded-2xl bg-ink-900 border border-white/5 p-5">
            <h2 className="text-lg font-bold mb-4">Отзывы</h2>
            {profile.reviews.length === 0 ? (
              <p className="text-white/40 text-sm">
                Пока нет отзывов. Будьте первым, кто оставит впечатление о встрече.
              </p>
            ) : (
              <div className="space-y-3">
                {profile.reviews.map((r, i) => (
                  <div key={i} className="rounded-xl bg-ink-800 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{r.author}</span>
                      <span className="text-[12px] text-white/35">{r.date}</span>
                    </div>
                    <p className="text-white/75 text-[14px] mt-2 leading-relaxed">{r.text}</p>
                    <button className="mt-3 flex items-center gap-1.5 text-[13px] text-white/45 hover:text-brand-400 transition">
                      <ThumbsUp className="w-4 h-4" /> {r.likes}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT — sticky contact card (desktop) */}
        <aside className="hidden lg:block space-y-4 lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl bg-ink-900 border border-white/5 p-5">
            <button className="w-full h-12 rounded-xl gradient-bar text-white font-semibold shadow-glow flex items-center justify-center gap-2 hover:opacity-95 transition">
              <Send className="w-4.5 h-4.5" /> Написать сообщение
            </button>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button className="h-11 rounded-xl bg-ink-800 border border-white/5 font-medium flex items-center justify-center gap-2 hover:border-brand/40 transition">
                <Heart className="w-4 h-4" /> В избранное
              </button>
              <button className="h-11 rounded-xl bg-ink-800 border border-white/5 font-medium flex items-center justify-center gap-2 hover:border-brand/40 transition">
                <Calendar className="w-4 h-4" /> Встреча
              </button>
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold text-white/80 mb-2">Ищу</div>
              <div className="flex flex-wrap gap-1.5">
                {profile.lookingFor.map((g) => (
                  <span
                    key={g}
                    className="text-[12px] px-2.5 py-1 rounded-lg bg-brand/15 text-brand-400 border border-brand/20"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-2.5 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-white/40">Метро</span>
                <span className="text-right font-medium max-w-[60%]">
                  {profile.metro.join(", ")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40">Языки</span>
                <span className="font-medium">{profile.languages.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40">Статус</span>
                <span className="font-medium text-emerald-400">Проверена</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-ink-900 border border-white/5 p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-verify shrink-0 mt-0.5" />
            <p className="text-[12px] text-white/55 leading-relaxed">
              Анкета прошла верификацию по фото и документу. Общайтесь внутри lumi и не передавайте
              деньги до личной встречи в публичном месте.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
