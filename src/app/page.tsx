import MainContent from "@/components/main";
import Suggest from "@/components/suggest";
import SideBar from "@/components/sidebar";
import { getSession } from "@auth0/nextjs-auth0";
import Dashboard from "./dashboard";
import "./globals.css";


export default async function Home() {
  const session = await getSession();
  const user = session?.user;

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
