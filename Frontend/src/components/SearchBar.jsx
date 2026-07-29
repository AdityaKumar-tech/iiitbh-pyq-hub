// src/components/SearchBar.jsx
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
      />
      <input
        type="text"
        placeholder="Search subjects, notes, PYQs..."
        className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-shadow"
      />
    </div>
  );
}