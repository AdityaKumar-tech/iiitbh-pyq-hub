// src/pages/SubjectSelectionPage.jsx
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import SubjectGrid from "../components/SubjectGrid";

// Replace with real fetch/query — placeholder shape shown for the UI pass
const subjectsBySemester = {
  3: [
    {
      slug: "data-structures",
      name: "Data Structures & Algorithms",
      code: "CS301",
      instructor: "Prof. Sharma",
      counts: { notes: 12, pyqs: 6, labs: 4, books: 3 },
    },
    {
      slug: "digital-electronics",
      name: "Digital Electronics",
      code: "EC302",
      instructor: "Prof. Verma",
      counts: { notes: 9, pyqs: 5, labs: 6, books: 2 },
    },
  ],
};

export default function SubjectSelectionPage() {
  const { semesterId } = useParams(); // route: /resources/semester-:semesterId
  const id = semesterId?.replace("semester-", "");
  const subjects = subjectsBySemester[id] || [];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <Breadcrumb
          trail={[
            { label: "Resources", to: "/resources" },
            { label: `Semester ${id}` },
          ]}
        />
        <PageHeader
          title={`Semester ${id} subjects`}
          subtitle="Notes, PYQs, lab manuals and more for each subject"
        />
        {subjects.length > 0 ? (
          <SubjectGrid subjects={subjects} semesterId={id} />
        ) : (
          <div className="text-center py-24 text-muted text-sm">
            No subjects added for this semester yet.
          </div>
        )}
      </div>
    </div>
  );
}