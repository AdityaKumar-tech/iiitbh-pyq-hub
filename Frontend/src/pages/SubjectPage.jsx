// src/pages/SubjectPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import SubjectHeader from "../components/SubjectHeader";
import Tabs from "../components/Tabs";
import ResourceList from "../components/ResourceList";
import OverviewPanel from "../components/OverviewPanel";

// Placeholder — replace with real fetch/query
const subjectsData = {
  3: {
    "data-structures": {
      name: "Data Structures & Algorithms",
      code: "CS301",
      instructor: "Prof. Sharma",
      description:
        "Core data structures, algorithm design, and complexity analysis, with weekly lab implementation in C.",
      counts: { notes: 12, pyqs: 6, assignments: 4, labs: 4, books: 3 },
      notes: [
        { id: 1, title: "Unit 1 — Arrays & Linked Lists", meta: "PDF · 2.4 MB · Updated Jul 12" },
        { id: 2, title: "Unit 2 — Stacks & Queues", meta: "PDF · 1.8 MB · Updated Jul 15" },
      ],
      pyqs: [
        { id: 3, title: "End Sem 2025", meta: "PDF · 640 KB · Updated Jun 2" },
      ],
      assignments: [
        { id: 4, title: "Assignment 3 — Binary Trees", meta: "PDF · 210 KB · Due Aug 4" },
      ],
      labs: [
        { id: 5, title: "Lab Manual — Sorting Algorithms", meta: "PDF · 3.1 MB · Updated Jul 8" },
      ],
      books: [
        { id: 6, title: "Introduction to Algorithms (CLRS)", meta: "Reference · External link" },
      ],
      recent: [
        { id: 2, type: "notes", title: "Unit 2 — Stacks & Queues", meta: "Updated Jul 15" },
        { id: 4, type: "assignments", title: "Assignment 3 — Binary Trees", meta: "Due Aug 4" },
        { id: 1, type: "notes", title: "Unit 1 — Arrays & Linked Lists", meta: "Updated Jul 12" },
      ],
    },
  },
};

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "notes", label: "Notes" },
  { key: "pyqs", label: "PYQs" },
  { key: "assignments", label: "Assignments" },
  { key: "labs", label: "Lab Manual" },
  { key: "books", label: "Books" },
  { key: "downloads", label: "Downloads" },
];

export default function SubjectPage() {
  const { semesterId, subjectSlug } = useParams();
  const id = semesterId?.replace("semester-", "");
  const subject = subjectsData[id]?.[subjectSlug];
  const [activeTab, setActiveTab] = useState("overview");

  if (!subject) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center text-sm text-muted">
          Subject not found.
        </div>
      </div>
    );
  }

  const allResources = [
    ...(subject.notes || []).map((r) => ({ ...r, type: "notes" })),
    ...(subject.pyqs || []).map((r) => ({ ...r, type: "pyqs" })),
    ...(subject.assignments || []).map((r) => ({ ...r, type: "assignments" })),
    ...(subject.labs || []).map((r) => ({ ...r, type: "labs" })),
    ...(subject.books || []).map((r) => ({ ...r, type: "books" })),
  ];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        <Breadcrumb
          trail={[
            { label: "Resources", to: "/resources" },
            { label: `Semester ${id}`, to: `/resources/semester-${id}` },
            { label: subject.name },
          ]}
        />

        <SubjectHeader subject={subject} semesterId={id} />

        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {activeTab === "overview" && (
          <OverviewPanel subject={subject} onJumpToTab={setActiveTab} />
        )}
        {activeTab === "downloads" && (
          <ResourceList items={allResources} type={undefined} />
        )}
        {["notes", "pyqs", "assignments", "labs", "books"].includes(activeTab) && (
          <ResourceList items={subject[activeTab]} type={activeTab} />
        )}
      </div>
    </div>
  );
}