"use client";

import React, { useEffect, useState } from "react";

interface User {
  picture: string;
  name: string;
  email: string;
}
const ProfileClient = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

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
