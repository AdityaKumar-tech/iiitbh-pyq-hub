// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-[#0F172A] tracking-tight">
          Adhayaay
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
          <Link to="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
          <Link to="/resources" className="hover:text-[#0F172A] transition-colors">Resources</Link>
          <Link to="/mentors" className="hover:text-[#0F172A] transition-colors">Mentors</Link>
          <Link to="/announcements" className="hover:text-[#0F172A] transition-colors">Announcements</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="p-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
          >
            <Search size={18} />
          </button>
          <Link
            to="/profile"
            aria-label="Profile"
            className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center text-white"
          >
            <User size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}