"use client";

import Input from "@/components/Shared/Input";
import Link from "next/link";

function Register() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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

        <form className="mt-5 space-y-3">
          <Input
            value={undefined}
            title="Name"
            placeholder="Enter Name"
            onChange={handleChange}
            required
            type="text"
            name="name"
          />
          <Input
            value={undefined}
            title="Email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
            type="email"
            name="email"
          />
          <Input
            value={undefined}
            title="Number"
            placeholder="Enter Number"
            onChange={handleChange}
            required
            type="number"
            name="number"
          />
          <Input
            value={undefined}
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
              value="Register Now"
              className="w-full py-2 bg-primary text-white font-semibold text-lg rounded"
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
