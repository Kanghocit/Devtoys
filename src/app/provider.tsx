"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SearchProvider } from "@/context/SearchContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SearchProvider>{children}</SearchProvider>
    </UserProvider>
  );
}
