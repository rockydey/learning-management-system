"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (accessToken: string, enabled = true) =>
  useQuery({
    queryKey: ["user", accessToken],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: accessToken,
        },
      });
      return res.data.data;
    },
    enabled: !!accessToken && enabled,
    staleTime: 1000 * 60 * 5,
  });
