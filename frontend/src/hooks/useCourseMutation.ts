"use client";

import axiosInstance from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateCourseProps {
  title: string;
  description: string;
  price: number;
  thumbnail: File;
  accessToken: string;
}

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
    enabled: !!accessToken,
  });

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      price,
      thumbnail,
      accessToken,
    }: CreateCourseProps) => {
      const formData = new FormData();
      formData.append("file", thumbnail);
      formData.append("data", JSON.stringify({ title, description, price }));

      const res = await axiosInstance.post("/course/create-course", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
