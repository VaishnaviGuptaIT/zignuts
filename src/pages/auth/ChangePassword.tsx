import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { decryptPassword, encryptPassword } from "../../utils/encryption";

const ChangePassword = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchNewPassword = watch("newPassword");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);
  }, []);

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const onSubmit = (data: any) => {
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

    // Reset password fields
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("confirmPassword", "");
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <Controller
              name="currentPassword"
              control={control}
              rules={{ required: "Current password is required" }}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-600">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "New password is required",
                validate: (value) =>
                  validatePassword(value) ||
                  "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
              }}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watchNewPassword || "Passwords do not match",
              }}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
