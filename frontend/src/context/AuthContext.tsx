"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useGetUser";

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
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { data: user, isLoading, refetch } = useGetUser(token!);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  // Effect to check token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Login user function
  const loginUser = async (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    refetch();
    router.push("/");
  };

  // Logout user function
  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
