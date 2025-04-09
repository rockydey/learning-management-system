import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Lecture = {
  title: string;
  videoURL: string;
  pdfLinks: string[];
};

type CreateModuleProps = {
  title: string;
  course: string;
  lectures: Lecture[];
  accessToken: string;
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      course,
      lectures,
      accessToken,
    }: CreateModuleProps) => {
      const res = await axiosInstance.post(
        "/module/create-module",
        { title, course, lectures },
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
};
