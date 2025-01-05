import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { decryptPassword, encryptPassword } from "../../utils/encryption";
import { Lock, Eye, EyeOff } from "lucide-react";
import { PasswordFormInputs } from "../../utils/type";

const ChangePassword = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PasswordFormInputs>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const watchNewPassword = watch("newPassword");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    field: keyof PasswordFormInputs
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').replace(/\s/g, '');
    setValue(field, pastedText);
  };

  const onSubmit = (data: PasswordFormInputs) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (currentPassword !== decryptPassword(currentUser?.password)) {
      toast.error("Current password is incorrect");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const updatedUser = {
      ...currentUser,
      password: encryptPassword(newPassword),
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(
      (user: any) => user.email === currentUser.email
    );
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    toast.success("Password updated successfully!");

    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("confirmPassword", "");
  };

  return (
    <>
      <div className=" flex items-center justify-center mt-3">
        <div className="w-full max-w-lg">
          <div className="backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/[0.1] overflow-hidden">
            <div className="relative p-8  bg-gradient-to-br from-violet-950 via-indigo-900 to-slate-900">
              {/* Brand Section */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center transform transition-all duration-500 hover:rotate-[360deg] hover:scale-110">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-teal-300 bg-clip-text text-transparent pb-2">
                  Change Password
                </h2>
                <p className="text-indigo-200/80">Update your account password</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Current Password */}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                    <Controller
                      name="currentPassword"
                      control={control}
                      rules={{ 
                        required: "Current password is required",
                        validate: {
                          noSpaces: (value) => !/\s/.test(value) || "Password cannot contain spaces"
                        }
                      }}
                      render={({ field }) => (
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          {...field}
                          onKeyDown={handleKeyDown}
                          onPaste={(e) => handlePaste(e, "currentPassword")}
                          className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-indigo-200/50 text-white"
                          placeholder="Current Password"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-indigo-200"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.currentPassword && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                    <Controller
                      name="newPassword"
                      control={control}
                      rules={{
                        required: "New password is required",
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
                      }}
                      render={({ field }) => (
                        <input
                          type={showNewPassword ? "text" : "password"}
                          {...field}
                          onKeyDown={handleKeyDown}
                          onPaste={(e) => handlePaste(e, "newPassword")}
                          className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-indigo-200/50 text-white"
                          placeholder="New Password"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-indigo-200"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.newPassword && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Please confirm your new password",
                        validate: {
                          matchesPassword: (value) =>
                            value === watchNewPassword || "Passwords do not match",
                          noSpaces: (value) => !/\s/.test(value) || "Password cannot contain spaces"
                        }
                      }}
                      render={({ field }) => (
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          onKeyDown={handleKeyDown}
                          onPaste={(e) => handlePaste(e, "confirmPassword")}
                          className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-transparent placeholder-indigo-200/50 text-white"
                          placeholder="Confirm New Password"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-indigo-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.confirmPassword && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 hover:from-violet-600 hover:via-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-[1px]"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;