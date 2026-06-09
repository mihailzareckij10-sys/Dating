"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Map, Plus, Moon, Globe, ShieldCheck } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function TopBar() {
  return (
    <div className="gradient-bar text-white text-[11px] sm:text-xs font-semibold">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 h-7 flex items-center justify-between">
        <span className="hidden sm:flex items-center gap-1.5 opacity-95">
          <Globe className="w-3.5 h-3.5" /> Москва
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Только проверенные анкеты
        </span>
        <span className="hidden sm:flex items-center gap-2 opacity-95">
          <span className="cursor-pointer">RU</span>
          <Moon className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

export function Header() {
  const { user, openLogin } = useAuth();
  const router = useRouter();

  const handleCreate = () => {
    if (user) router.push("/create");
    else openLogin();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 h-16 flex items-center gap-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          lumi<span className="gradient-text">.</span>
        </Link>

        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            placeholder="Поиск по имени, интересам…"
            className="w-full h-10 rounded-xl bg-ink-800 border border-white/5 pl-9 pr-3 text-sm placeholder:text-white/35 outline-none focus:border-brand/60 transition"
          />
        </div>

        <Link
          href="/map"
          className="hidden sm:flex items-center gap-1.5 h-10 px-3 rounded-xl border border-brand/40 text-brand-400 text-sm font-medium hover:bg-brand/10 transition"
        >
          <Map className="w-4 h-4" /> Карта
        </Link>

        <div className="flex-1 sm:hidden" />

        {user ? (
          <Link
            href="/account"
            className="h-10 pl-1 pr-3 rounded-xl bg-ink-800 border border-white/5 flex items-center gap-2 hover:border-brand/40 transition"
          >
            <img
              src={user.photo_url || "https://i.pravatar.cc/100?img=5"}
              alt={user.first_name}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-sm font-medium max-w-[90px] truncate">{user.first_name}</span>
          </Link>
        ) : (
          <button
            onClick={openLogin}
            className="h-10 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white transition"
          >
            Войти
          </button>
        )}

        <button
          onClick={handleCreate}
          className="h-10 px-3 sm:px-4 rounded-xl gradient-bar text-white text-sm font-semibold shadow-glow flex items-center gap-1.5 hover:opacity-95 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Создать анкету</span>
        </button>
      </div>
    </header>
  );
}
