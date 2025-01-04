// Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { User, getUsers } from "../../utils/storage";
import { decryptPassword } from "../../utils/encryption";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/authSlice";

interface LoginInputs {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginInputs>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const users = getUsers();
      const user = users.find((u: User) => u.email === formData.email);

      if (!user) {
        setError("Email not found");
        return;
      }

      if (decryptPassword(user.password) !== formData.password) {
        setError("Incorrect password");
        return;
      }

      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      dispatch(setLogin(true));

      // Navigate to protected route
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-violet-950 via-indigo-900 to-slate-900">
      {/* Background elements remain the same */}
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
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-teal-300 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h2>
                <p className="text-indigo-200/80">Sign in to your account</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 bg-red-500/10 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3 text-red-200 border border-red-500/20 animate-shake">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-indigo-200/50 text-white"
                      placeholder="Email address"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-indigo-200/50 text-white"
                      placeholder="Password"
                      required
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
                </div>

                {/* Submit Button */}
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
                {/* Register Link */}
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
