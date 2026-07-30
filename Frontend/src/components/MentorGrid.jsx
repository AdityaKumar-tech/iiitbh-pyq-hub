// src/components/MentorGrid.jsx
import MentorCard from "./MentorCard";

export default function MentorGrid({ mentors }) {
  if (!mentors || mentors.length === 0) {
    return (
      <div className="text-center py-24 text-sm text-muted">
        No mentors added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
}