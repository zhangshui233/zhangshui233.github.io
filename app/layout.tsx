import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "张清华 — 3D 设计作品集",
  description:
    "张清华的 3D 设计作品集：车机 HMI、未来出行、机器人、产品设计。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
