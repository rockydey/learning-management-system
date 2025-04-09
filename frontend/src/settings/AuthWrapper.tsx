"use client";

import { Loader } from "@/components/Loader/Loader";
import { isLoggedIn } from "@/lib/isLogging";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const checkAuth = () => {
      const isUser = isLoggedIn();
      if (!isUser) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return <>{children}</>;
}
