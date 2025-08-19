import React from "react";
import {
  Bell,
  User,
  Moon,
  Sun,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../Components/UI/UI";
import { useTheme } from "../../context/AdminTheme";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear tokens/localStorage
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header className="bg-white dark:bg-[#111827] border-b dark:border-gray-700 shadow-sm p-4 px-6 flex items-center justify-between">
      {/* Left Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight mt-2">
        Admin Dashboard
      </h1>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-indigo-400 transition"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-700" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>

        {/* Notification Bell */}
        <button
          title="Notifications"
          className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-indigo-400 transition"
        >
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Admin Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:ring-2 hover:ring-indigo-400 transition text-sm text-gray-800 dark:text-gray-200 font-medium">
              <User className="w-5 h-5" />
              Admin
            </button>
          </DropdownMenuTrigger>

          {/* <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
            <DropdownMenuItem
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm cursor-pointer"
              onClick={() => navigate("/admin/profile")}
            >
              <UserCircle className="w-4 h-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm cursor-pointer"
              onClick={() => navigate("/admin/settings")}
            >
              <Settings className="w-4 h-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 text-sm text-red-600 dark:text-red-400 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
