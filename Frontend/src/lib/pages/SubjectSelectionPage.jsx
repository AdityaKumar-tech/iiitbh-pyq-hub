// src/pages/SubjectSelectionPage.jsx
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import SubjectGrid from "../components/SubjectGrid";

import pyqData from "../data/pyq-data.json";

export default function SubjectSelectionPage() {
  const { semesterId } = useParams(); // route: /resources/semester-:semesterId
  const id = semesterId?.replace("semester-", "");
  
  const semesterData = pyqData.semesters.find(s => s.semester_number === parseInt(id));
  const subjects = semesterData?.subjects.map(sub => ({
    slug: sub.subject_code.toLowerCase(),
    name: sub.subject_name,
    code: sub.subject_code,
    instructor: "",
    counts: { pyqs: 0, notes: 0, labs: 0, books: 0 },
  })) || [];

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