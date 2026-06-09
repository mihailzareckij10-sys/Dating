"use client";

import { X } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { TelegramLoginPanel } from "./TelegramLogin";

export function LoginModal() {
  const { loginOpen, closeLogin } = useAuth();
  if (!loginOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={closeLogin}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-ink-900 border border-white/10 p-5 shadow-card relative animate-[fadeIn_.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeLogin}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg grid place-items-center text-white/50 hover:text-white hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-lg font-extrabold tracking-tight mb-1">
          lumi<span className="gradient-text">.</span>
        </div>
        <p className="text-[13px] text-white/45 mb-4">
          Войдите, чтобы публиковать и редактировать анкеты.
        </p>
        <TelegramLoginPanel />
      </div>
    </div>
  );
}
