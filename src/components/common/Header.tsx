import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Key, Menu, X, ShoppingBag } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-violet-950 via-indigo-900 to-slate-900 border-b border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo/Brand Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-r from-violet-500 to-indigo-500 p-2 rounded-xl">
              <Link to="/">
                {" "}
                <ShoppingBag className="h-6 w-6 text-white" />{" "}
              </Link>
            </div>
            <Link
              to="/"
              className="ml-3 text-xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-teal-300 bg-clip-text text-transparent"
            >
              Products
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink
              to="/home"
              icon={<Home className="h-5 w-5" />}
              label="Home"
              isActive={isActive("/home")}
            />
            <NavLink
              to="/profile"
              icon={<User className="h-5 w-5" />}
              label="Profile"
              isActive={isActive("/profile")}
            />
            <NavLink
              to="/change-password"
              icon={<Key className="h-5 w-5" />}
              label="Password"
              isActive={isActive("/change-password")}
            />
            <div className="ml-4 pl-4 border-l border-white/[0.1]">
              <LogoutButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-indigo-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "animate-slideIn" : "hidden"
        } border-t border-white/[0.1] bg-gradient-to-b from-violet-950/90 to-slate-900/90 backdrop-blur-xl`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <MobileNavLink
            to="/home"
            icon={<Home className="h-5 w-5" />}
            label="Home"
            isActive={isActive("/home")}
            onClick={() => setIsMenuOpen(false)}
          />
          <MobileNavLink
            to="/profile"
            icon={<User className="h-5 w-5" />}
            label="Profile"
            isActive={isActive("/profile")}
            onClick={() => setIsMenuOpen(false)}
          />
          <MobileNavLink
            to="/change-password"
            icon={<Key className="h-5 w-5" />}
            label="Password"
            isActive={isActive("/change-password")}
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="pt-2 mt-2 border-t border-white/[0.1]">
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
      className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white"
          : "text-indigo-200/80 hover:text-white"
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="transform transition-transform group-hover:scale-110">
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transform scale-x-100 transition-transform duration-300" />
      )}
    </Link>
  );
}

function MobileNavLink({
  to,
  icon,
  label,
  isActive,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-3 py-3 rounded-xl space-x-3 transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white"
          : "text-indigo-200/80 hover:text-white hover:bg-white/[0.03]"
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
