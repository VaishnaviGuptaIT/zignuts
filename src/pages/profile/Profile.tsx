import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getCurrentUser, getUsers } from "../../utils/storage";
import { User, Mail, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import { ProfileFormInputs } from "../../utils/type";

const Profile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    },
  });


 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };


  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, field: keyof ProfileFormInputs) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').replace(/\s/g, '');
    setValue(field, getValues(field) + pastedText);
  };

  const fetchUserData = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user); 
      reset(user); 
    }
  };

  const updateUserData = (updatedUser: any) => {
    const users = getUsers();
    const emailExists = users.some(
      (user) => user.email === updatedUser.email && user.email !== currentUser.email
    );
  
    if (emailExists) {
      toast.error("The email address is already in use!");
      return;
    }
  
    const index = users.findIndex((user) => user.email === currentUser.email);
  
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser }; 
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser)); 
      setCurrentUser(updatedUser); 
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else {
      toast.error("User not found!");
    }
  };
  
  const onSubmit = (data: ProfileFormInputs) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser, 
        ...data,        
      };
  
      updateUserData(updatedUser);
      reset(updatedUser); 
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
  <>

<div className=" flex items-center justify-center mt-3">
        <div className="w-full max-w-lg">
          <div className="backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/[0.1] overflow-hidden">
            <div className="relative p-8  bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900">
            <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center transform transition-all duration-500 hover:rotate-[360deg] hover:scale-110">
                  <User className="h-10 w-10 text-white" />
                </div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-teal-300">
                {isEditing ? "Edit Profile" : "View Profile"}
              </h2>
              <p className="text-indigo-200/80">Manage your account details</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                {/* First Name */}
                <div className="relative transform transition-all duration-300 hover:translate-x-1">
                  <div className="flex items-center">
                    <User className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                        validate: {
                          noSpaces: (value) => !/\s/.test(value) || "First name cannot contain spaces"
                        }
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={!isEditing}
                          onKeyDown={handleKeyDown}
                          onPaste={(e) => handlePaste(e, "firstName")}
                          className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white disabled:opacity-50"
                          placeholder="First Name"
                        />
                      )}
                    />
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.firstName && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="relative transform transition-all duration-300 hover:translate-x-1">
                  <div className="flex items-center">
                    <User className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                        validate: {
                          noSpaces: (value) => !/\s/.test(value) || "Last name cannot contain spaces"
                        }
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={!isEditing}
                          onKeyDown={handleKeyDown}
                          onPaste={(e) => handlePaste(e, "lastName")}
                          className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white disabled:opacity-50"
                          placeholder="Last Name"
                        />
                      )}
                    />
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.lastName && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="relative sm:col-span-2 transform transition-all duration-300 hover:translate-x-1">
                  <div className="flex items-center">
                    <Mail className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address"
                        },
                        validate: {
                          noSpaces: (value) => !/\s/.test(value) || "Email cannot contain spaces"
                        }
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          disabled={!isEditing}
                          onKeyDown={handleKeyDown}
                          onPaste={(e) => handlePaste(e, "email")}
                          className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white disabled:opacity-50"
                          placeholder="Email"
                        />
                      )}
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

                {/* Mobile */}
                <div className="relative sm:col-span-2 transform transition-all duration-300 hover:translate-x-1">
                  <div className="flex items-center">
                    <Smartphone className="absolute left-4 h-5 w-5 text-indigo-300" />
                    <Controller
                      name="mobile"
                      control={control}
                      rules={{
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit mobile number",
                        },
                        validate: {
                          noSpaces: (value) => !/\s/.test(value) || "Mobile number cannot contain spaces"
                        }
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="tel"
                          maxLength={10}
                          disabled={!isEditing}
                          onKeyDown={handleKeyDown}
                          onPaste={(e) => handlePaste(e, "mobile")}
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                          }}
                          className="w-full pl-12 px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl focus:ring-2 focus:ring-violet-500 text-white disabled:opacity-50"
                          placeholder="Mobile Number"
                        />
                      )}
                    />
                  </div>
                  <div className="h-6 flex items-center">
                    {errors.mobile && (
                      <p className="mt-1 text-red-400 text-sm">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

             
            </form>
            <div className="flex justify-center gap-4 mt-6">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="w-full py-4 px-6 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 hover:from-violet-600 hover:via-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-[1px]"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      className="w-[50%] py-4 px-6 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 hover:from-violet-600 hover:via-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-[1px]"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="w-[50%] py-4 px-6 bg-white/[0.1] hover:bg-white/[0.15] rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-[1px]"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

