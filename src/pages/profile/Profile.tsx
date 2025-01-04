import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getCurrentUser, getUsers } from "../../utils/storage";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    },
  });

  const watchEmail = watch("email");

  const fetchUserData = () => {
    const user = getCurrentUser();
    if (user) {
      reset(user);
    }
  };

  const updateUserData = (updatedUser: any) => {
    const users = getUsers();

    const emailExists = users.some((user) => user.email === updatedUser.email);

    if (emailExists && updatedUser.email !== watchEmail) {
      toast.error("The email address is already in use!");
    } else {
      const index = users.findIndex(
        (user) => user.email === updatedUser.oldEmail
      );

      if (index === -1) {
        users.splice(index, 1);

        users.push(updatedUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!watch("firstName")) newErrors.firstName = "First name is required";
    if (!watch("lastName")) newErrors.lastName = "Last name is required";
    if (!watch("email")) newErrors.email = "Email is required";
    if (!watch("mobile")) newErrors.mobile = "Mobile number is required";

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (data: any) => {
    if (validate()) {
      updateUserData(data);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit" : "View"} Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                />
              )}
            />
            {errors.email && (
              <div className="text-sm text-red-600">{errors.email.message}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            />
            {errors.firstName && (
              <div className="text-sm text-red-600">
                {errors.firstName.message}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            />
            {errors.lastName && (
              <div className="text-sm text-red-600">
                {errors.lastName.message}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <Controller
              name="mobile"
              control={control}
              rules={{ required: "Mobile number is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            />
            {errors.mobile && (
              <div className="text-sm text-red-600">
                {errors.mobile.message}
              </div>
            )}
          </div>
        </form>
        <div className="flex justify-between">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEditClick}
              className="py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelClick}
                className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
