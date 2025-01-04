import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { setLogout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-300"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
};
