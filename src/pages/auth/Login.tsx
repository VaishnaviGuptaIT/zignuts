import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { User, getUsers } from "../../utils/storage";
import { decryptPassword } from "../../utils/encryption";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface LoginInputs {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<LoginInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, field: keyof LoginInputs) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').replace(/\s/g, '');
    setValue(field, getValues(field) + pastedText);
  };

  const onSubmit = async (formData: LoginInputs) => {
    try {
      const users = getUsers();
      const user = users.find((u: User) => u.email === formData.email);

      if (!user) {
        toast.error("Email not found");
        return;
      }

      if (decryptPassword(user.password) !== formData.password) {
        toast.error("Incorrect password");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(setLogin(true));
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("An error occurred during login");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-violet-950 via-indigo-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] top-[-250px] left-[-250px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bottom-[-250px] right-[-250px] bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-teal-500/20 rounded-full blur-3xl animate-slow-spin" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/[0.1] overflow-hidden">
            <div className="relative p-8">
              {/* Brand Section */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center transform transition-all duration-500 hover:rotate-[360deg] hover:scale-110">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-teal-300 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h2>
                <p className="text-indigo-200/80">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Input */}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                        validate: {
                          noSpaces: (value) => !/\s/.test(value) || "Email cannot contain spaces"
                        }
                      })}
                      onKeyDown={handleKeyDown}
                      onPaste={(e) => handlePaste(e, "email")}
                      className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-indigo-200/50 text-white"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.email && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Input */}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        },
                        maxLength: {
                          value: 32,
                          message: "Password must not exceed 32 characters"
                        },
                        validate: {
                          noSpaces: (value) => !/\s/.test(value) || "Password cannot contain spaces",
                          lowercase: (value) => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                          uppercase: (value) => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                          digit: (value) => /\d/.test(value) || "Password must contain at least one number",
                          specialChar: (value) => 
                            /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value) || 
                            "Password must contain at least one special character",
                          format: (value) =>
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,32}$/.test(value) ||
                            "Password must meet all requirements"
                        }
                      })}
                      type={showPassword ? "text" : "password"}
                      onKeyDown={handleKeyDown}
                      onPaste={(e) => handlePaste(e, "password")}
                      className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-indigo-200/50 text-white"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-indigo-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.password && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 hover:from-violet-600 hover:via-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] active:translate-y-[1px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>

                <div className="text-center">
                  <p className="text-indigo-200/80">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-indigo-200/80 hover:text-white font-medium transition-colors duration-300 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
