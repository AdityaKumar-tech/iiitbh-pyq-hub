// src/components/Breadcrumb.jsx
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ trail }) {
  // trail: [{ label: "Resources", to: "/resources" }, { label: "Semester 3" }]
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-8">
      <Link
        to="/"
        className="flex items-center text-muted hover:text-ink transition-colors"
        aria-label="Home"
      >
        <Home size={15} />
      </Link>
      {trail.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-line" />
          {item.to ? (
            <Link to={item.to} className="text-muted hover:text-ink font-medium transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}