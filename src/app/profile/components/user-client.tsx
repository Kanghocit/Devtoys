"use client";

import useUser from "@/hooks/useUser";

const ProfileClient = () => {
  const  user  = useUser();

  return user ? (
    <div>
      <img
        src={user.picture}
        alt={user.name}
        className="w-10 h-10 rounded-full"
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : (
    <div>No user found</div>
  );
};

export default ProfileClient;
