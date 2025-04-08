/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface FormData {
  name: string;
  email: string;
  number: string;
  password: string;
}

interface RegisterResponse {
  data: any;
}

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await axiosInstance.post("/auth/login", credentials);
      return res.data.accessToken;
    },
  });

export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post("/auth/register", formData);

      return res.data.data;
    },
  });
};
