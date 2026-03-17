import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import  { signUpSchema } from "../../lib/schemas"
import useAuthCall from "../../hooks/useAuthCall"

const SignUp = () => {
  const { signUp } = useAuthCall()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signUpSchema),
      defaultValues: {
    firstName: "",
    lastName: "",
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  },

    
  })

  const onSubmit = async (data) => {
    await signUp(data)
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight font-header text-brand">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm/6 font-medium text-brand">
                First Name
              </label>
              <div className="mt-2">
                <input
                  {...register("firstName")}
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm/6 font-medium text-brand">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  {...register("lastName")}
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-brand">
              Username
            </label>
            <div className="mt-2">
              <input
                {...register("username")}
                id="username"
                type="text"
                autoComplete="username"
                className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-brand">
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-brand">
              Password
            </label>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-brand">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border border-[#D8D1C7] bg-[#FCFAF7] px-3 py-2 text-base text-[#2B2B2B] outline-none placeholder:text-[#9C948A] focus:border-brand sm:text-sm/6"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-[#F8F5F0] hover:bg-[#3C4A41] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-[#7A746C]">
          Already have an account?{' '}
          <Link to="/sign-in" className="font-medium text-brand hover:text-[#55635A]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp