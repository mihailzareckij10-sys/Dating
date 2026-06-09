"use client";

import { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useAuth, TgUser } from "./AuthProvider";

const BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "";

/** Injects the official Telegram Login Widget if a bot username is configured. */
export function TelegramWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!BOT || !ref.current) return;
    ref.current.innerHTML = "";
    const s = document.createElement("script");
    s.src = "https://telegram.org/js/telegram-widget.js?22";
    s.async = true;
    s.setAttribute("data-telegram-login", BOT);
    s.setAttribute("data-size", "large");
    s.setAttribute("data-radius", "12");
    s.setAttribute("data-onauth", "onTelegramAuth(user)");
    s.setAttribute("data-request-access", "write");
    ref.current.appendChild(s);
  }, []);

  if (!BOT) return null;
  return <div ref={ref} className="flex justify-center min-h-[48px]" />;
}

/** Full login panel — used in modal and on the account page. */
export function TelegramLoginPanel() {
  const { login } = useAuth();

  const demo = () => {
    const u: TgUser = {
      id: Math.floor(Math.random() * 1e9),
      first_name: "Гость",
      username: "lumi_guest",
      photo_url: "https://i.pravatar.cc/200?img=12",
      auth_date: Math.floor(Date.now() / 1000),
    };
    login(u);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-[#229ED9]/15 grid place-items-center text-[#33b1ee]">
          <Send className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold">Вход через Telegram</div>
          <div className="text-[13px] text-white/45">
            Только подтверждённые аккаунты. Без пароля.
          </div>
        </div>
      </div>

      <TelegramWidget />

      {!BOT && (
        <p className="text-[12px] text-white/40 leading-relaxed">
          Виджет Telegram появится после привязки бота. Укажите имя бота в
          переменной <code className="text-white/60">NEXT_PUBLIC_TELEGRAM_BOT_USERNAME</code>{" "}
          и домен в настройках бота (<code className="text-white/60">/setdomain</code> у @BotFather).
        </p>
      )}

      <button
        onClick={demo}
        className="w-full h-11 rounded-xl bg-[#229ED9] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition"
      >
        <Send className="w-4 h-4" />
        {BOT ? "Войти (демо)" : "Войти через Telegram (демо)"}
      </button>
      <p className="text-[12px] text-white/35 text-center">
        Продолжая, вы соглашаетесь с правилами сообщества lumi.
      </p>
    </div>
  );
}

export { BOT as TELEGRAM_BOT };
