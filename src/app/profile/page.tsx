import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

import ProfileClient from "./components/user-client";

const Profile = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col h-[98%] items-center justify-center rounded-2xl m-2 shadow-md ">
      <ProfileClient />
    </div>
  );
};

export default Profile;
