import { cookies } from "next/headers";
import ProfileForm from "./profile-form";

export default async function ProfileServer() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) return <div>No user found</div>;

  const user = JSON.parse(decodeURIComponent(userCookie.value));
  const firstName = user.name.split(" ")[0];
  const parts = user.name.split(" ");
  const lastName = parts.slice(1).join(" ");

  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <img
        src={user.picture}
        alt={user.name}
        className="rounded-full w-30 h-30"
      />
      <ProfileForm
        firstName={firstName}
        lastName={lastName}
        nickname={user.nickname}
        email={user.email}
      />
    </div>
  );
}
