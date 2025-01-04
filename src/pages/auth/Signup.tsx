import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { encryptPassword } from "../../utils/encryption";
import { User, saveUser } from "../../utils/storage";
import { validateEmail, passwordRegex } from "../../utils/validation";
import {
  User as UserIcon,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

interface SignupFormInputs extends User {
  confirmPassword: string;
}

export const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm<SignupFormInputs>();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.length >= 5) {
        toast.error("Registration limit reached. Maximum of 5 users allowed.");
        return;
      }

      if (
        users.some(
          (user) => user.email.toLowerCase() === data.email.toLowerCase()
        )
      ) {
        setError("email", {
          type: "manual",
          message:
            "This email is already registered. Please use a different one.",
        });
        return;
      }

      const newUser: User = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.toLowerCase().trim(),
        mobile: data.mobile.trim(),
        password: encryptPassword(data.password),
      };

      saveUser(newUser);

      toast.success("Registration successful! Redirecting to login page...");

      reset();

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        "Something went wrong during signup. Please try again later."
      );
    }
  };

  const validatePasswordMatch = (value: string) => {
    const password = watch("password");
    return value === password || "Passwords do not match";
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-violet-950 via-indigo-900 to-slate-900">
      {/* {/ Background Animation /} */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] top-[-250px] left-[-250px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bottom-[-250px] right-[-250px] bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-teal-500/20 rounded-full blur-3xl animate-slow-spin" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-lg backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/[0.1] overflow-hidden">
          <div className="p-8">
            {/* {/ Brand Section /} */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center transform transition-all duration-500 hover:rotate-[360deg] hover:scale-110">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-teal-300">
                Create Account
              </h2>
              <p className="text-indigo-200/80">Sign up to get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* {/ First Name /} */}
                <div className="relative">
                  <div className="flex items-center">
                    <UserIcon className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      })}
                      className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white"
                      placeholder="First Name"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* {/ Last Name /} */}
                <div className="relative">
                  <div className="flex items-center">
                    <UserIcon className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      })}
                      className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white"
                      placeholder="Last Name"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* {/ Email /} */}
                <div className="relative sm:col-span-2">
                  <div className="flex items-center">
                    <Mail className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <input
                      {...register("email", {
                        required: "Email is required",
                        validate: {
                          validEmail: (value) =>
                            validateEmail(value) ||
                            "Please enter a valid email address",
                        },
                      })}
                      className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* {/ Mobile /} */}
                <div className="relative sm:col-span-2">
                  <div className="flex items-center">
                    <Smartphone className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <input
                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message:
                            "Please enter a valid 10-digit mobile number",
                        },
                      })}
                      type="tel"
                      maxLength={10}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                      }}
                      className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white"
                      placeholder="Mobile Number"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* {/ Password /} */}
                <div className="relative">
                  <div className="flex items-center">
                    <Lock className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <input
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: passwordRegex,
                          message:
                            "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 text-indigo-300 hover:text-indigo-200 transition-colors duration-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* {/ Confirm Password /} */}
                <div className="relative">
                  <div className="flex items-center">
                    <Lock className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <input
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: validatePasswordMatch,
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white"
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 text-indigo-300 hover:text-indigo-200 transition-colors duration-300 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* {/ Submit Button /} */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 hover:from-violet-600 hover:via-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] active:translate-y-[1px]"
              >
                Sign Up
              </button>

              {/* {/ Login Link /} */}
              <div className="text-center mt-4">
                <p className="text-indigo-200/80">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-200/80 hover:text-white font-medium transition-colors duration-300 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
