"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

const setTokenCookie = (token: string) => {
  Cookies.set("token", token, { expires: 7, path: "/" });
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await axiosInstance.post("/auth/login", credentials);

      const token = res.data.data.accessToken;
      if (token) {
        setTokenCookie(token);
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
      }

      return res.data.data;
    },
  });

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      number: string;
      password: string;
    }) => {
      const res = await axiosInstance.post("/auth/register", formData);

      const token = res.data.data.accessToken;
      if (token) {
        setTokenCookie(token);
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
      }

      return res.data.data;
    },
  });
};
