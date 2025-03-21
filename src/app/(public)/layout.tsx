"use client";

import SideBar from "@/components/sidebar";
import useUser from "@/hooks/useUser";
import Dashboard from "../dashboard";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="https://icon-library.com/images/cat-icon-gif/cat-icon-gif-14.jpg"
          className="w-200 h-200 object-cover"
        />
      </div>
    );
  }

  if (error || !user) {
    return <Dashboard />;
  }

  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <aside className="h-screen overflow-y-auto bg-white shadow-md scrollbar-custom min-w-[60px] w-fit me-2">
        <SideBar />
      </aside>

      <div className="flex flex-col gap-2 justify-between border-t-2 border-l-2 border-gray-300 shadow-md shadow-gray-100 rounded-2xl ps-10 pt-10 h-full overflow-hidden">
        <main className="overflow-auto scrollbar-custom w-full flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
