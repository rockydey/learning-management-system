"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetCourse = (accessToken: string) =>
  useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosInstance.get("/course", {
        headers: {
          Authorization: accessToken,
        },
      });

      return res.data.data;
    },
    enabled: !!accessToken, // Only run when accessToken exists
  });
