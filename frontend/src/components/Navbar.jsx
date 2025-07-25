import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/api";
import ThemeToggle from "./ThemeToogle";
import logo from "../assets/IvanYuantama.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo Aksamedia" className="w-10 h-10 object-contain" />
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-gray-800 dark:text-white">Manajemen Karyawan</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Ivan Yuantama</span>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <ThemeToggle />

        {/* Dropdown User */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded transition">
            {user?.name}
            <svg className={`w-4 h-4 transform transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg animate-fade-in z-50">
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0V5a3 3 0 016 0v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
