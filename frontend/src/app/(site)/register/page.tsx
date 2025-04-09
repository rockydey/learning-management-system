/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Input from "@/components/Shared/Input";
import { useRegisterMutation } from "@/hooks/useAuthMutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

interface FormDataProps {
  name: string;
  email: string;
  number: string;
  password: string;
}

const initialProps = {
  name: "",
  email: "",
  number: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState<FormDataProps>(initialProps);
  const { mutate, isPending } = useRegisterMutation();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = event.target;

    const updatedValue = type === "number" ? String(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        toast.success("Register successful. Login Now!");
        router.push("/login");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "Registration failed!";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="max-w-[460px] mx-auto py-20 px-5 md:px-0">
      <div className="border border-gray-300 rounded-lg p-5">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">
            Welcome to <span className="text-primary">Academix</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-heading font-bold">
            Register Here
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <Input
            value={formData.name}
            title="Name"
            placeholder="Enter Name"
            onChange={handleChange}
            required
            type="text"
            name="name"
          />
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
            value={formData.number}
            title="Number"
            placeholder="Enter Number"
            onChange={handleChange}
            required
            type="number"
            name="number"
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
              value={isPending ? "Registering..." : "Register Now"}
              className="w-full py-2 bg-primary text-white font-semibold text-lg rounded cursor-pointer disabled:cursor-not-allowed"
              disabled={isPending}
            />
          </div>
        </form>
        <p className="mt-3 text-center font-medium text-text">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-secondary hover:border-b border-secondary duration-300"
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
