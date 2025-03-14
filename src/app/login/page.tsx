"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

import { FaEye } from "react-icons/fa";
import OtpInput from "@/components/input/OtpInput";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("data", data);
    router.push("/");
    alert("Login successful");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  console.log("otp", otp);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center my-2">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 ">
            <div className="flex justify-between">
              <label>Password</label>
              <span className="mx-2 text-supprimary font-bold cursor-pointer text-sm">
                Forgot password?
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                })}
                className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none w-full"
              />
              <FaEye
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-center gap-2">
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
            <input
              type="checkbox"
              {...register("remember", { required: false })}
              id="remember"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Login"
              className="bg-supprimary text-white px-4 py-2 rounded-md w-full cursor-pointer hover:opacity-90"
            />
          </div>

          <div className="flex justify-center">
            <span>
              Not a member?{" "}
              <Link href="/register" className="text-supprimary text-sm">
                Pay to join DevToys
              </Link>
            </span>
          </div>
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            length={6}
            separator="-"
            // variant="filled"
            // mark="🔑"
            formatter={(value) => value.toUpperCase()}
            // mark="*"3
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
