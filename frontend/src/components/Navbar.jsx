import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl bg-white/70 dark:bg-gray-900/60
        shadow-lg border-b border-gray-200 dark:border-gray-700
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* BRAND LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          EMI STORE
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-16 text-lg font-medium">
       

          <Link
          
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            to="/"
          >
            Products
          </Link>

          <Link
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            to="/about"
          >
            About
          </Link>
        </div>

        {/* THEME TOGGLE */}
        <div className="hidden md:flex items-center space-x-5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div
          className="
            md:hidden absolute w-full left-0 top-[68px]
            bg-white/95 dark:bg-gray-900/95
            backdrop-blur-lg shadow-xl
            border-t border-gray-300 dark:border-gray-700
            animate-slideDown
          "
       >

          <Link
           to="/"
            onClick={() => setOpen(false)}
            className="block px-6 py-5 text-lg hover:bg-white-100 dark:hover:bg-gray-800 transition"
          >
            Products
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block px-6 py-5 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            About
          </Link>

          {/* MOBILE THEME TOGGLE */}
          <div className="px-6 py-5 border-t border-gray-300 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
