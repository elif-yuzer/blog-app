import React from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from '../../lib/schemas';
import useAuthCall from '../../hooks/useAuthCall';

const SignIn = () => {
  const { signIn } = useAuthCall();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signInSchema)
  });

  async function onSubmit(userCredentials) {
    await signIn(userCredentials);
  }

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight font-header text-brand">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-brand">
                Username
              </label>
              <div className="mt-2">
                <input
                  {...register("username", { required: true })}
                  aria-invalid={errors.username ? "true" : "false"}
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
                />
                {errors.username?.type === "required" && (
                  <p role="alert">First name is required</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-brand">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-brand hover:text-[#55635A]">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-[#F8F5F0] hover:bg-[#3C4A41]"
                >
                {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-[#7A746C]">
            Not a member?{' '}
            <a href="#" className="font-medium text-brand hover:text-[#55635A]">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;