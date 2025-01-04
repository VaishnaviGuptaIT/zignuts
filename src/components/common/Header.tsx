import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Key, LogOut, ShoppingBag } from "lucide-react";
// import { useAuth } from '../contexts/AuthContext';
import { LogoutButton } from "./LogoutButton";

export function Header() {
  //   const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <NavLink
                to="/home"
                icon={<Home />}
                label="Home"
                isActive={isActive("/home")}
              />
              <NavLink
                to="/profile"
                icon={<User />}
                label="Profile"
                isActive={isActive("/profile")}
              />
              <NavLink
                to="/change-password"
                icon={<Key />}
                label="Password"
                isActive={isActive("/change-password")}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <span className="text-gray-600">{user?.email}</span> */}
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  to,
  icon,
  label,
  isActive,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? "text-indigo-600 bg-indigo-50"
          : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Link>
  );
}
