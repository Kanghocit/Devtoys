import { useEffect, useState } from "react";

interface User {
  picture: string;
  name: string;
  email: string;
  nickname: string;
  given_name: string;
  family_name: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          if (res.status === 401) {
            setUser(null);
            return;
          }
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
