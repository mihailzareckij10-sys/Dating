import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TopBar, Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { AuthProvider } from "./components/AuthProvider";
import { LoginModal } from "./components/LoginModal";

export const metadata: Metadata = {
  title: "lumi — проверенные знакомства",
  description:
    "lumi — сообщество проверенных анкет. Знакомься, общайся и находи единомышленников рядом.",
};

export const viewport: Viewport = {
  themeColor: "#0c0c11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <TopBar />
          <Header />
          <main className="mx-auto max-w-6xl px-3 sm:px-4 pb-24 sm:pb-12">{children}</main>
          <BottomNav />
          <LoginModal />
        </AuthProvider>
      </body>
    </html>
  );
}
