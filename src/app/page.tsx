"use client";

import MainContent from "@/components/main";
import SideBar from "@/components/sidebar";
import Suggest from "@/components/suggest";
import useUser from "@/hooks/useUser";
import Dashboard from "./dashboard";
import "./globals.css";

export default function Home() {
  const { user, loading, error } = useUser();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="https://banner2.cleanpng.com/20180418/fpw/avfkzsggd.webp"
          className="w-200 h-200 object-cover rounded-full animate-spin relative"
        />
        <div className="text-4xl text-white shadow-lg font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Nạp tiền đi....
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="bg-white rounded-tl-lg ">
        {user ? (
          <div className="grid grid-cols-[auto_1fr] h-screen">
            <aside className="h-screen overflow-y-auto bg-white shadow-md scrollbar-custom min-w-[60px] w-fit me-2">
              <SideBar />
            </aside>

            <div className="flex flex-col gap-2 justify-between border-t-2 border-l-2 border-gray-300 shadow-md shadow-gray-100 rounded-2xl ps-10 pt-10 h-full overflow-hidden">
              <main className="overflow-auto scrollbar-custom w-full flex-grow ">
                <MainContent />
                <div className="pb-4">
                  <Suggest />
                </div>
              </main>
            </div>
          </div>
        ) : (
          <Dashboard />
        )}
      </div>
    </>
  );
}
