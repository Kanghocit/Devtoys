import MainContent from "@/components/main";
import Suggest from "@/components/suggest";
import { getSession } from "@auth0/nextjs-auth0";
import Login from "@/components/button/login";
export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);
  return (
    <>
      <div className="mx-2 bg-white p-2 rounded-tl-lg ">
        {user ? (
          <div className="flex flex-col gap-2 justify-between border-t-2 border-l-2 border-gray-300 shadow-md shadow-gray-100  rounded-2xl ps-10 pt-10 h-full">
            <MainContent />
            <div className="pb-4">
              <Suggest />
            </div>
          </div>
        ) : (
          <div className="">
            <Login />
          </div>
        )}
      </div>
    </>
  );
}
