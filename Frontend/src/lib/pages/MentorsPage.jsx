// src/pages/MentorsPage.jsx
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";
import PageHeader from "../../components/PageHeader";
import MentorGrid from "../../components/MentorGrid";

import mentorsData from "../../data/mentors-data.json";

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;

    async function fetchMentors() {
      try {
        setStatus("loading");
        // Replace with your real endpoint, e.g. `${import.meta.env.VITE_API_URL}/mentors`

        // Fake call
        await new Promise((r) => setTimeout(r, 400)); // fake network delay so you can see the skeleton
       if (!cancelled) {
         setMentors(mentorsData.map((m, i) => ({ ...m, id: String(i + 1) })));
         setStatus("success");
       }
       return;

       // Real api call
        const res = await fetch("/api/mentors");
        if (!res.ok) throw new Error("Failed to fetch mentors");
        const data = await res.json();
        if (!cancelled) {
          setMentors(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    }

    fetchMentors();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <Breadcrumb trail={[{ label: "Mentors" }]} />
        <PageHeader
          title="Mentors"
          subtitle="Reach out on LinkedIn — most mentors reply within a day or two"
        />

        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-card border border-line bg-white p-6 h-26 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F1F5F9]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 bg-[#F1F5F9] rounded" />
                    <div className="h-2.5 w-1/3 bg-[#F1F5F9] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-24 text-sm text-muted">
            Couldn't load mentors right now. Try refreshing the page.
          </div>
        )}

        {status === "success" && <MentorGrid mentors={mentors} />}
      </div>
    </div>
  );
}