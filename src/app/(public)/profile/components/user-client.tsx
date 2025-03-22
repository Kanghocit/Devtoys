"use client";

// import useUser from "@/hooks/useUser";

const ProfileClient = () => {
  const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1];

  if (!userCookie) return null;

  const user = JSON.parse(decodeURIComponent(userCookie));
  const firstName = user.name.split(" ")[0];
  const parts = user.name.split(" ");
  const lastName = parts.slice(1).join(" ");

  return user ? (
    <div
      className="flex flex-col items-center gap-2 p-2"
      suppressHydrationWarning
    >
      <img
        src={user.picture}
        alt={user.name}
        className="rounded-full w-30 h-30"
      />
      <form action="" className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p>First Name</p>
            <input
              type="text"
              name="First Name"
              value={firstName}
              className="border-2 border-gray-300 rounded-md p-2 min-w-96"
            />
          </div>

          <div>
            <p>Last Name</p>
            <input
              type="text"
              name="Last Name"
              value={lastName}
              className="border-2 border-gray-300 rounded-md p-2 min-w-96"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Nickname</p>
          <input
            type="text"
            name="nickname"
            value={user.nickname}
            className="border-2 border-gray-300 rounded-md p-2 min-w-50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={user.email}
            className="border-2 border-gray-300 rounded-md p-2 min-w-50"
          />
        </div>

        <button className="bg-blue-500 text-white p-2 rounded-md">
          Update
        </button>
      </form>
    </div>
  ) : (
    <div>No user found</div>
  );
};

export default ProfileClient;
