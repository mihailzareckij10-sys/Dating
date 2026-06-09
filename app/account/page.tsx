"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, LogOut, ShieldCheck, Pencil, FileText } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import { TelegramLoginPanel } from "../components/TelegramLogin";

type Draft = { id: string; name: string; age: string; district: string; createdAt: number };

export default function AccountPage() {
  const { user, ready, logout } = useAuth();
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lumi.drafts");
      if (raw) setDrafts(JSON.parse(raw));
    } catch {}
  }, [user]);

  if (!ready) return <div className="py-10 text-center text-white/40">Загрузка…</div>;

  if (!user) {
    return (
      <div className="py-6 max-w-md mx-auto">
        <h1 className="text-xl font-extrabold tracking-tight mb-1">Профиль</h1>
        <p className="text-sm text-white/45 mb-5">
          Войдите через Telegram, чтобы публиковать анкеты, добавлять в избранное и переписываться.
        </p>
        <div className="rounded-2xl bg-ink-900 border border-white/5 p-5">
          <TelegramLoginPanel />
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-2xl mx-auto space-y-5">
      <div className="rounded-2xl bg-ink-900 border border-white/5 p-5 flex items-center gap-4">
        <img
          src={user.photo_url || "https://i.pravatar.cc/200?img=5"}
          alt={user.first_name}
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold tracking-tight truncate">
              {user.first_name} {user.last_name || ""}
            </h1>
            <ShieldCheck className="w-4 h-4 text-verify shrink-0" />
          </div>
          {user.username && <div className="text-[13px] text-brand-400">@{user.username}</div>}
          <div className="text-[12px] text-white/40 mt-0.5">Вход через Telegram</div>
        </div>
        <button
          onClick={logout}
          className="ml-auto h-9 px-3 rounded-xl bg-ink-800 border border-white/5 text-sm text-white/70 flex items-center gap-1.5 hover:border-brand/40 transition shrink-0"
        >
          <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Выйти</span>
        </button>
      </div>

      <Link
        href="/create"
        className="flex items-center justify-center gap-2 w-full h-12 rounded-xl gradient-bar text-white font-semibold shadow-glow hover:opacity-95 transition"
      >
        <Plus className="w-5 h-5" /> Создать анкету
      </Link>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-white/45" />
          <h2 className="font-bold">Мои анкеты</h2>
        </div>
        {drafts.length === 0 ? (
          <div className="rounded-2xl bg-ink-900 border border-white/5 p-6 text-center text-white/45 text-sm">
            У вас пока нет опубликованных анкет.
          </div>
        ) : (
          <div className="space-y-2.5">
            {drafts.map((d) => (
              <div
                key={d.id}
                className="rounded-2xl bg-ink-900 border border-white/5 p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">
                    {d.name}, {d.age}
                  </div>
                  <div className="text-[13px] text-white/45">{d.district}</div>
                </div>
                <span className="text-[12px] px-2.5 py-1 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/20 flex items-center gap-1">
                  <Pencil className="w-3 h-3" /> На модерации
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
