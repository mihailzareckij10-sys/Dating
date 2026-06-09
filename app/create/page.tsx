"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  Camera,
  CheckCircle2,
  ChevronDown,
  FileText,
  Heart,
  Lock,
  LogOut,
  MapPin,
  Pencil,
  Plus,
  Send,
  ShieldCheck,
  User,
  Users,
  Video,
} from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import { TelegramLoginPanel } from "../components/TelegramLogin";

const districts = [
  "Арбат",
  "Басманный",
  "Хамовники",
  "Пресненский",
  "Таганский",
  "Хорошёвский",
  "Хорошёво-Мнёвники",
  "Марьина роща",
  "Сокольники",
  "Останкинский",
  "Якиманка",
  "Ломоносовский",
];

const metroStations = ["Аэропорт", "Белорусская", "Киевская", "Китай-город", "Парк культуры", "Сокольники"];
const lookingOptions = ["Отношения", "Дружба", "Совместные поездки", "Спорт вместе", "Творчество"];
const interests = ["Кино", "Кофе", "Прогулки", "Путешествия", "Музыка", "Йога", "Танцы", "Книги"];
const bodyTypes = ["Стройное", "Спортивное", "Нормальное", "Плотное"];
const hairColors = ["Брюнет(ка)", "Шатен(ка)", "Русые", "Рыжие", "Блондин(ка)", "Цветные"];
const lifestyles = ["Не курю", "За ЗОЖ", "Люблю животных", "Часто путешествую", "Домосед(ка)", "Люблю вечеринки"];
const contactChannels = ["Внутренний чат", "Telegram после мэтча", "Звонок после взаимного лайка", "Соцсети после согласия"];

const sections = [
  { id: "general", label: "Общие сведения" },
  { id: "contacts", label: "Социальные сети" },
  { id: "location", label: "Местоположение" },
  { id: "description", label: "Описание" },
  { id: "appearance", label: "Внешние данные" },
  { id: "preferences", label: "Предпочтения" },
  { id: "media", label: "Медиафайлы" },
  { id: "verification", label: "Проверочное видео" },
];

type FormState = {
  name: string;
  age: string;
  city: string;
  language: string;
  gender: string;
  district: string;
  metro: string;
  headline: string;
  about: string;
  height: string;
  bodyType: string[];
  hairColor: string[];
  lifestyle: string[];
  looking: string[];
  interests: string[];
  contacts: Record<string, string>;
  contactChannels: string[];
};

const contactRows = [
  { key: "instagram", label: "Instagram", prefix: "https://www.instagram.com/" },
  { key: "telegram", label: "Telegram", prefix: "https://t.me/" },
  { key: "vk", label: "VK", prefix: "https://vk.com/" },
  { key: "youtube", label: "YouTube", prefix: "https://www.youtube.com/" },
  { key: "tiktok", label: "TikTok", prefix: "https://www.tiktok.com/@" },
  { key: "website", label: "Сайт", prefix: "https://" },
  { key: "email", label: "Email для уведомлений", prefix: "" },
];

const menuItems = [
  { label: "Мой профиль", icon: User },
  { label: "Мои анкеты", icon: FileText, active: true },
  { label: "Знакомства", icon: Users },
  { label: "Уведомления", icon: Bell },
  { label: "Избранное", icon: Heart },
  { label: "Проверка", icon: ShieldCheck },
  { label: "Выйти", icon: LogOut },
];

export default function CreatePage() {
  const { user, ready } = useAuth();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    age: "",
    city: "Москва",
    language: "Русский",
    gender: "Девушка",
    district: districts[0],
    metro: metroStations[0],
    headline: "",
    about: "",
    height: "",
    bodyType: [],
    hairColor: [],
    lifestyle: [],
    looking: [],
    interests: [],
    contacts: {},
    contactChannels: [],
  });

  if (!ready) return <div className="py-10 text-center text-white/40">Загрузка…</div>;

  // Gate — publishing only for Telegram-authenticated users
  if (!user) {
    return (
      <div className="py-8 max-w-md mx-auto">
        <div className="rounded-2xl bg-ink-900 border border-white/5 p-6 text-center shadow-card">
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

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleArray = (key: "bodyType" | "hairColor" | "lifestyle" | "looking" | "interests" | "contactChannels", value: string) =>
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));

  const updateContact = (key: string, value: string) =>
    setForm((current) => ({
      ...current,
      contacts: { ...current.contacts, [key]: value },
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
        city: form.city,
        district: form.district,
        headline: form.headline,
        createdAt: Date.now(),
      });
      localStorage.setItem("lumi.drafts", JSON.stringify(arr));
    } catch {}
    setDone(true);
  };

  return (
    <div className="py-5 lg:py-8">
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_220px]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-3xl bg-ink-900 border border-white/5 p-5 shadow-card">
              <div className="text-2xl font-extrabold tracking-tight mb-3">
                lumi<span className="gradient-text">.</span>
              </div>
              <div className="rounded-2xl bg-ink-800 border border-white/5 p-4">
                <div className="text-2xl font-extrabold">0</div>
                <div className="text-xs text-white/45 mt-0.5">анкет на модерации</div>
                <Link
                  href="/account"
                  className="mt-3 h-10 rounded-xl gradient-bar text-white text-sm font-semibold flex items-center justify-center"
                >
                  Личный кабинет
                </Link>
              </div>
            </div>

            <nav className="rounded-3xl bg-ink-900 border border-white/5 p-2 shadow-card">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`w-full h-11 px-3 rounded-2xl flex items-center gap-3 text-sm transition ${
                      item.active
                        ? "bg-brand/12 text-brand-400"
                        : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <form onSubmit={submit} className="space-y-6 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-brand-400 mb-1">
                <Plus className="w-5 h-5" />
                <span className="text-sm font-semibold">Создание профиля</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Добавление анкеты</h1>
              <p className="text-sm text-white/45 mt-2 max-w-2xl">
                Вошли как <span className="text-brand-400">@{user.username || user.first_name}</span>.
                Заполните разделы — после отправки анкета попадёт на модерацию.
              </p>
            </div>
            <span className="hidden sm:inline-flex rounded-full bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              Dating-профиль
            </span>
          </div>

          <SectionCard id="copy" title="">
            <SelectLike label="Копировать анкету" value="Создать новую анкету" />
          </SectionCard>

          <SectionCard id="general" title="Общие сведения">
            <div className="grid gap-3">
              <SelectLike label="Тип анкеты" value="Личная dating-анкета" />
              <SelectLike label="Язык" value={form.language} />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextInput
                  label="Имя *"
                  value={form.name}
                  maxLength={50}
                  placeholder="Как вас зовут"
                  onChange={(value) => update("name", value)}
                  error={!form.name}
                />
                <NumberInput
                  label="Возраст *"
                  value={form.age}
                  min={18}
                  max={100}
                  placeholder="18"
                  onChange={(value) => update("age", value)}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectField
                  label="Город *"
                  value={form.city}
                  options={["Москва", "Санкт-Петербург", "Казань", "Сочи", "Екатеринбург"]}
                  onChange={(value) => update("city", value)}
                />
                <SelectField
                  label="Пол"
                  value={form.gender}
                  options={["Девушка", "Парень", "Не указывать"]}
                  onChange={(value) => update("gender", value)}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            id="contacts"
            title="Социальные сети"
            note="Контакты не публикуются как открытый каталог: их можно показывать только после взаимного лайка или по настройке приватности."
          >
            <div className="space-y-3">
              {contactRows.map((row) => (
                <SocialInput
                  key={row.key}
                  label={row.label}
                  prefix={row.prefix}
                  value={form.contacts[row.key] || ""}
                  onChange={(value) => updateContact(row.key, value)}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard id="location" title="Местоположение">
            <div className="space-y-3">
              <SelectField
                label="Район"
                value={form.district}
                options={districts}
                onChange={(value) => update("district", value)}
              />
              <SelectField
                label="Метро"
                value={form.metro}
                options={metroStations}
                onChange={(value) => update("metro", value)}
              />
              <div className="relative h-72 rounded-2xl overflow-hidden border border-white/5 bg-ink-800">
                <div className="absolute inset-0 opacity-85 bg-[radial-gradient(circle_at_20%_30%,rgba(52,211,153,.22),transparent_24%),radial-gradient(circle_at_72%_28%,rgba(61,164,255,.18),transparent_20%),linear-gradient(135deg,#1c2b2a,#151820_48%,#252130)]" />
                <div className="absolute inset-0">
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-white/18 rotate-[-10deg]" />
                  <div className="absolute left-0 right-0 top-1/3 h-px bg-brand/30 rotate-[7deg]" />
                  <div className="absolute left-10 right-10 bottom-20 h-px bg-white/15 rotate-[18deg]" />
                  <div className="absolute top-16 left-8 text-[11px] text-white/45">{form.district}</div>
                  <div className="absolute top-24 right-12 text-[11px] text-white/45">{form.metro}</div>
                  <div className="absolute bottom-7 right-7 text-[11px] text-white/35">OpenStreetMap preview</div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="w-11 h-11 rounded-full gradient-bar grid place-items-center shadow-glow">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute left-4 top-4 h-10 px-3 rounded-xl bg-ink-950/80 border border-white/10 text-sm text-white/70"
                >
                  Скрыть точный адрес
                </button>
                <div className="absolute right-4 top-4 grid overflow-hidden rounded-xl border border-white/10">
                  <button type="button" className="w-10 h-10 bg-ink-950/85 text-lg">+</button>
                  <button type="button" className="w-10 h-10 bg-ink-950/85 text-lg border-t border-white/10">−</button>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard id="description" title="Описание">
            <div className="space-y-3">
              <TextInput
                label="Короткое описание"
                value={form.headline}
                maxLength={90}
                placeholder="Например: люблю прогулки, кофе и честные разговоры"
                onChange={(value) => update("headline", value)}
              />
              <div>
                <label className="text-[13px] text-white/60 mb-1.5 block">О себе</label>
                <textarea
                  className="w-full min-h-[150px] rounded-2xl bg-ink-800 border border-white/5 p-4 text-sm placeholder:text-white/35 outline-none focus:border-brand/60 transition resize-none"
                  placeholder="Расскажите о себе, интересах и кого хотите найти"
                  value={form.about}
                  onChange={(e) => update("about", e.target.value)}
                />
              </div>
              <ChipGroup label="Интересы" options={interests} selected={form.interests} onToggle={(value) => toggleArray("interests", value)} />
            </div>
          </SectionCard>

          <SectionCard id="appearance" title="Внешние данные">
            <div className="grid gap-3">
              <NumberInput
                label="Рост"
                value={form.height}
                min={120}
                max={220}
                placeholder="170"
                onChange={(value) => update("height", value)}
              />
              <CheckboxGrid label="Телосложение" options={bodyTypes} selected={form.bodyType} onToggle={(value) => toggleArray("bodyType", value)} />
              <CheckboxGrid label="Цвет волос" options={hairColors} selected={form.hairColor} onToggle={(value) => toggleArray("hairColor", value)} />
              <CheckboxGrid label="Стиль жизни" options={lifestyles} selected={form.lifestyle} onToggle={(value) => toggleArray("lifestyle", value)} />
            </div>
          </SectionCard>

          <SectionCard id="preferences" title="Предпочтения">
            <div className="space-y-5">
              <CheckboxGrid label="Цель знакомства" options={lookingOptions} selected={form.looking} onToggle={(value) => toggleArray("looking", value)} />
              <CheckboxGrid
                label="Канал связи"
                options={contactChannels}
                selected={form.contactChannels}
                onToggle={(value) => toggleArray("contactChannels", value)}
              />
              <div className="rounded-2xl bg-brand/10 border border-brand/20 p-4 text-sm text-brand-50/90">
                В анкете делаем акцент на мэтчи, интересы и безопасное общение внутри приложения — без прайс-листов и открытой выдачи контактов.
              </div>
            </div>
          </SectionCard>

          <SectionCard id="media" title="Медиафайлы">
            <div className="grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className="aspect-[4/5] rounded-2xl border border-dashed border-white/12 bg-ink-800/70 hover:border-brand/45 transition grid place-items-center text-center p-4"
                >
                  <span>
                    <Camera className="w-7 h-7 text-white/35 mx-auto mb-2" />
                    <span className="text-xs text-white/45">{index === 0 ? "Главное фото" : "Добавить фото"}</span>
                  </span>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="verification" title="Проверочное видео">
            <div className="rounded-2xl border border-dashed border-white/12 bg-ink-800/70 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-verify/15 grid place-items-center text-verify shrink-0">
                <Video className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <div className="font-bold">Видео для модерации</div>
                <p className="text-sm text-white/45 mt-1">
                  Загружается приватно и нужно только для подтверждения личности. В профиле не показывается.
                </p>
              </div>
              <button type="button" className="sm:ml-auto h-11 px-4 rounded-xl bg-ink-700 text-sm font-semibold hover:bg-ink-600 transition">
                Загрузить
              </button>
            </div>
          </SectionCard>

          <div className="sticky bottom-20 sm:bottom-4 z-20 rounded-2xl bg-ink-950/85 backdrop-blur-xl border border-white/10 p-3 flex gap-3 shadow-card">
            <button
              type="button"
              className="hidden sm:inline-flex h-12 px-5 rounded-xl bg-ink-800 border border-white/5 text-sm font-semibold text-white/70 items-center justify-center hover:border-white/20 transition"
            >
              Сохранить черновик
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl gradient-bar text-white font-semibold shadow-glow flex items-center justify-center gap-2 hover:opacity-95 transition"
            >
              <Send className="w-4.5 h-4.5" /> Отправить на модерацию
            </button>
          </div>
        </form>

        <aside className="hidden xl:block">
          <nav className="sticky top-24 rounded-3xl bg-ink-900 border border-white/5 p-4 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30 mb-3">Разделы</div>
            <div className="space-y-1">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block rounded-2xl px-3 py-2.5 text-sm transition ${
                    index === 0 ? "text-brand-400 bg-brand/10" : "text-white/65 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}

function SectionCard({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      {title && <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-3">{title}</h2>}
      <div className="rounded-3xl bg-ink-900 border border-white/5 p-4 sm:p-5 shadow-card">
        {note && <p className="text-sm text-white/45 mb-4">{note}</p>}
        {children}
      </div>
    </section>
  );
}

function SelectLike({ label, value }: { label: string; value: string }) {
  return (
    <div className="h-14 rounded-2xl bg-ink-800 border border-white/5 px-4 flex items-center justify-between">
      <div>
        <div className="text-[11px] text-white/45">{label}</div>
        <div className="text-sm text-white/85 mt-0.5">{value}</div>
      </div>
      <ChevronDown className="w-4 h-4 text-white/35" />
    </div>
  );
}

function TextInput({
  label,
  value,
  placeholder,
  maxLength,
  error,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  error?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-[13px] text-white/60 mb-1.5 block">{label}</label>
      <div className="relative">
        <input
          className={`w-full h-14 rounded-2xl bg-ink-800 border px-4 pr-16 text-sm placeholder:text-white/35 outline-none focus:border-brand/60 transition ${
            error ? "border-brand/45" : "border-white/5"
          }`}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
        {maxLength && (
          <span className="absolute right-4 bottom-2 text-[11px] text-white/35">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
      {error && <div className="text-xs text-brand-400 mt-1.5">Обязательное поле</div>}
    </div>
  );
}

function NumberInput({
  label,
  value,
  placeholder,
  min,
  max,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  min: number;
  max: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-[13px] text-white/60 mb-1.5 block">{label}</label>
      <div className="relative">
        <input
          className="w-full h-14 rounded-2xl bg-ink-800 border border-white/5 px-4 pr-20 text-sm placeholder:text-white/35 outline-none focus:border-brand/60 transition"
          type="number"
          min={min}
          max={max}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="absolute right-4 bottom-2 text-[11px] text-white/35">
          {min}–{max}
        </span>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-[13px] text-white/60 mb-1.5 block">{label}</label>
      <div className="relative">
        <select
          className="appearance-none w-full h-14 rounded-2xl bg-ink-800 border border-white/5 px-4 pr-10 text-sm outline-none focus:border-brand/60 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-white/35 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

function SocialInput({
  label,
  prefix,
  value,
  onChange,
}: {
  label: string;
  prefix: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 items-center">
      <div className="w-11 h-11 rounded-full gradient-bar grid place-items-center text-white text-xs font-extrabold">
        {label.slice(0, 2).toUpperCase()}
      </div>
      <label className="rounded-2xl bg-ink-800 border border-white/5 px-4 py-2.5 block focus-within:border-brand/60 transition">
        <span className="block text-[11px] text-white/45">{label}</span>
        <div className="flex items-center text-sm">
          {prefix && <span className="text-white/35 shrink-0">{prefix}</span>}
          <input
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-white/25"
            placeholder={prefix ? "username" : "name@example.com"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </label>
    </div>
  );
}

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <div className="text-[13px] text-white/60 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`h-9 px-3.5 rounded-full text-sm font-medium border transition ${
                active
                  ? "bg-brand/15 text-brand-400 border-brand/40"
                  : "bg-ink-800 text-white/70 border-white/5 hover:border-white/20"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckboxGrid({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="font-extrabold mb-3">{label}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className="flex items-center gap-3 text-left text-sm text-white/80"
            >
              <span
                className={`w-5 h-5 rounded-md border grid place-items-center transition ${
                  active ? "bg-brand border-brand" : "bg-ink-800 border-white/12"
                }`}
              >
                {active && <span className="w-2 h-2 rounded-sm bg-white" />}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
