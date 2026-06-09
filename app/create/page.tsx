"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Send, CheckCircle2, Plus } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import { TelegramLoginPanel } from "../components/TelegramLogin";

const districts = [
  "Арбат", "Басманный", "Хамовники", "Пресненский", "Таганский",
  "Хорошёвский", "Хорошёво-Мнёвники", "Марьина роща", "Сокольники",
  "Останкинский", "Якиманка", "Ломоносовский",
];

const lookingOptions = ["Отношения", "Дружба", "Совместные поездки", "Спорт вместе", "Творчество"];

export default function CreatePage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    district: districts[0],
    headline: "",
    about: "",
    looking: [] as string[],
  });

  if (!ready) return <div className="py-10 text-center text-white/40">Загрузка…</div>;

  // Gate — publishing only for Telegram-authenticated users
  if (!user) {
    return (
      <div className="py-8 max-w-md mx-auto">
        <div className="rounded-2xl bg-ink-900 border border-white/5 p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand/15 grid place-items-center text-brand-400 mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-extrabold tracking-tight mb-1">Публикация после входа</h1>
          <p className="text-sm text-white/45 mb-5">
            Создавать анкеты можно только после входа через Telegram — так мы держим сообщество
            проверенным.
          </p>
          <TelegramLoginPanel />
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="py-10 max-w-md mx-auto text-center">
        <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
        <h1 className="text-xl font-extrabold tracking-tight mb-2">Анкета отправлена!</h1>
        <p className="text-sm text-white/50 mb-6">
          Анкета «{form.name}» отправлена на модерацию. Обычно проверка занимает до 24 часов.
        </p>
        <Link
          href="/account"
          className="inline-block px-6 py-3 rounded-xl gradient-bar text-white font-semibold shadow-glow"
        >
          В профиль
        </Link>
      </div>
    );
  }

  const toggleLooking = (v: string) =>
    setForm((f) => ({
      ...f,
      looking: f.looking.includes(v)
        ? f.looking.filter((x) => x !== v)
        : [...f.looking, v],
    }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age) return;
    try {
      const raw = localStorage.getItem("lumi.drafts");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift({
        id: Date.now().toString(),
        name: form.name,
        age: form.age,
        district: form.district,
        createdAt: Date.now(),
      });
      localStorage.setItem("lumi.drafts", JSON.stringify(arr));
    } catch {}
    setDone(true);
  };

  const input =
    "w-full h-11 rounded-xl bg-ink-800 border border-white/5 px-3.5 text-sm placeholder:text-white/35 outline-none focus:border-brand/60 transition";

  return (
    <div className="py-6 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <Plus className="w-5 h-5 text-brand-400" />
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Новая анкета</h1>
      </div>
      <p className="text-sm text-white/45 mb-5">
        Вошли как <span className="text-brand-400">@{user.username || user.first_name}</span>. После
        отправки анкета попадёт на модерацию.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[13px] text-white/55 mb-1.5 block">Имя</label>
            <input
              className={input}
              placeholder="Как вас зовут"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[13px] text-white/55 mb-1.5 block">Возраст</label>
            <input
              className={input}
              type="number"
              min={18}
              max={99}
              placeholder="18+"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="text-[13px] text-white/55 mb-1.5 block">Район</label>
          <select
            className={input}
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[13px] text-white/55 mb-1.5 block">Заголовок</label>
          <input
            className={input}
            placeholder="Например: Люблю горы и осознанные разговоры"
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
          />
        </div>

        <div>
          <label className="text-[13px] text-white/55 mb-1.5 block">О себе</label>
          <textarea
            className="w-full rounded-xl bg-ink-800 border border-white/5 p-3.5 text-sm placeholder:text-white/35 outline-none focus:border-brand/60 transition min-h-[110px] resize-none"
            placeholder="Расскажите о своих интересах и кого ищете"
            value={form.about}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />
        </div>

        <div>
          <label className="text-[13px] text-white/55 mb-2 block">Кого ищу</label>
          <div className="flex flex-wrap gap-2">
            {lookingOptions.map((o) => {
              const on = form.looking.includes(o);
              return (
                <button
                  type="button"
                  key={o}
                  onClick={() => toggleLooking(o)}
                  className={`h-9 px-3.5 rounded-full text-sm font-medium border transition ${
                    on
                      ? "bg-brand/15 text-brand-400 border-brand/40"
                      : "bg-ink-800 text-white/70 border-white/5 hover:border-white/20"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-[13px] text-white/40">
          Фото можно будет загрузить после подключения хранилища. Сейчас анкета сохраняется как
          черновик на модерацию.
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-xl gradient-bar text-white font-semibold shadow-glow flex items-center justify-center gap-2 hover:opacity-95 transition"
        >
          <Send className="w-4.5 h-4.5" /> Опубликовать анкету
        </button>
      </form>
    </div>
  );
}
