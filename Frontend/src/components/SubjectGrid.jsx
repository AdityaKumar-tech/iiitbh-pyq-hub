// src/components/SubjectGrid.jsx
import SubjectCard from "./SubjectCard";

export default function SubjectGrid({ subjects, semesterId }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {subjects.map((subject, i) => (
        <SubjectCard key={subject.slug} subject={subject} semesterId={semesterId} index={i} />
      ))}
    </div>
  );
}