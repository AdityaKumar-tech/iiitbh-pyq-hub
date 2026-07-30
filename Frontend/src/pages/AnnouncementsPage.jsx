// src/pages/AnnouncementsPage.jsx
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import AnnouncementSearch from "../components/AnnouncementSearch";
import AnnouncementCard from "../components/AnnouncementCard";

// Placeholder data — swap for your API response shape
const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Mid-sem timetable released",
    body: "Check the updated schedule for all branches — clashes have been resolved for CSE and ECE.",
    date: "2 days ago",
    category: "Academics",
    pinned: true,
  },
  {
    id: 2,
    title: "Lab manual uploads open",
    body: "Submit your lab manuals through the mentor portal before the 5th for faster review.",
    date: "3 days ago",
    category: "Submissions",
    pinned: true,
  },
  {
    id: 3,
    title: "New mentors onboarded for Sem 5",
    body: "Three senior mentors are now available for Computer Networks and OS doubt sessions.",
    date: "4 days ago",
    category: "Mentorship",
    pinned: false,
  },
  {
    id: 4,
    title: "Library extended hours during finals",
    body: "The central library will stay open until midnight starting next week.",
    date: "1 week ago",
    category: "Campus",
    pinned: false,
  },
];

export default function AnnouncementsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ANNOUNCEMENTS;
    return ANNOUNCEMENTS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [query]);

  const pinned = filtered.filter((a) => a.pinned);
  const rest = filtered.filter((a) => !a.pinned);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        <Breadcrumb trail={[{ label: "Announcements" }]} />
        <PageHeader
          title="Announcements"
          subtitle="Updates from the Adhayaay Club, most recent first"
        />
        <AnnouncementSearch value={query} onChange={setQuery} />

        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted text-sm">
            No announcements yet.
          </div>
        )}

        {pinned.length > 0 && (
          <div className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              {pinned.map((item, i) => (
                <AnnouncementCard key={item.id} item={item} pinned index={i} />
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            {pinned.length > 0 && (
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
                All announcements
              </h2>
            )}
            <div className="flex flex-col gap-4">
              {rest.map((item, i) => (
                <AnnouncementCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}