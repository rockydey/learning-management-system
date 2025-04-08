/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useAuthMutation";

interface User {
  _id: string;
  name: string;
  email: string;
  number: string;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  profileImg?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loginUser: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { mutateAsync: getUser } = useGetUser();

  // Fetch user data using the token
  const fetchUser = async (accessToken: string) => {
    try {
      setLoading(true);
      const userData = await getUser(accessToken);
      setUser(userData);
    } catch (err: any) {
      console.error("Failed to fetch user", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Effect to check token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  // Login user function
  const loginUser = async (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    await fetchUser(accessToken);
    router.push("/");
  };

  // Logout user function
  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
