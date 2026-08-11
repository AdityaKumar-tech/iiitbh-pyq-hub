// src/components/Navbar.jsx

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-line transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}

        <NavLink
          to="/"
          className="text-lg font-bold tracking-tight text-ink flex items-center gap-2"
        >
          <img src="/logo.png" alt="Adhyaay Logo" className="h-8 w-auto rounded-full object-cover dark:bg-white" />
          Adhyaay
        </NavLink>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-muted hover:text-ink transition-colors"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-muted hover:text-ink transition-colors"
            }
          >
            Resources
          </NavLink>

          <NavLink
            to="/mentors"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-muted hover:text-ink transition-colors"
            }
          >
            Mentors
          </NavLink>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScj7otKxTp8ihEho8GlRCrqyTuQ5Ow12KNPvxj3YBsLaodadQ/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink transition-colors"
          >
            Feedback
          </a>


        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-2">

          {/* Theme Toggle */}

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl bg-surface border border-line hover:bg-surface-2 transition-all duration-300"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-slate-700 dark:text-slate-300" />
            )}
          </button>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-xl bg-surface border border-line hover:bg-surface-2 transition-all duration-300"
          >
            {mobileOpen ? (
              <X size={18} className="text-ink" />
            ) : (
              <Menu size={18} className="text-ink" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-4 text-sm font-medium">

            <NavLink
              to="/"
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-surface-2 hover:text-ink"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/resources"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-surface-2 hover:text-ink"
                }`
              }
            >
              Resources
            </NavLink>

            <NavLink
              to="/mentors"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-surface-2 hover:text-ink"
                }`
              }
            >
              Mentors
            </NavLink>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScj7otKxTp8ihEho8GlRCrqyTuQ5Ow12KNPvxj3YBsLaodadQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-muted hover:bg-surface-2 hover:text-ink transition-colors"
            >
              Feedback
            </a>

          </nav>
        </div>
      )}
    </header>
  );
}