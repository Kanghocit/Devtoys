import SideBar from "@/components/sidebar";
import { SearchProvider } from "@/context/SearchContext";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devtoys",
  description: "Created by Khangdzno1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 overflow-auto scrollbar `}
      >
        <SearchProvider>
          <div className="grid grid-cols-[auto_1fr]  h-screen">
            <aside className="h-screen overflow-y-auto bg-white shadow-md scrollbar-custom w-fit ">
              <SideBar />
            </aside>
            <main className="overflow-auto scrollbar-custom w-full">
              {children}
            </main>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
