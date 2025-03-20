import { useEffect, useState } from "react";

interface User {
  picture: string;
  name: string;
  email: string;
}
export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  return user;
}
