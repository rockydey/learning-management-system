/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Input from "@/components/Shared/Input";
import { useAuth } from "@/context/AuthContext";
import { useLoginMutation } from "@/hooks/useAuthMutation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormDataProps {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormDataProps>({
    email: "",
    password: "",
  });
  const { mutate: login, isPending } = useLoginMutation();
  const { loginUser } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = formData.email;
    const password = formData.password;

    login(
      { email, password },
      {
        onSuccess: (token) => {
          loginUser(token.accessToken);
          toast.success("Login Successful!");
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Login failed!";
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="max-w-[460px] mx-auto py-20 px-5 md:px-0">
      <div className="border border-gray-300 rounded-lg p-5">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">
            Welcome to <span className="text-primary">Academix</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-heading font-bold">
            Login Here
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <Input
            value={formData.email}
            title="Email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
            type="email"
            name="email"
          />
          <Input
            value={formData.password}
            title="Password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
            type="password"
            name="password"
          />

          <div>
            <input
              type="submit"
              value={isPending ? "Logging..." : "Login Now"}
              className="w-full py-2 bg-primary text-white font-semibold text-lg rounded cursor-pointer disabled:cursor-not-allowed"
              disabled={isPending}
            />
          </div>
        </form>
        <p className="mt-3 text-center font-medium text-text">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-secondary hover:border-b border-secondary duration-300"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
