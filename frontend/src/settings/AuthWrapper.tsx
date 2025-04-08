"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { isLoggedIn } from "../lib/isLogging";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const isUser = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!isUser) {
      router.push("/login");
    }
  }, [isUser, router]);
  return <div>{children}</div>;
}
