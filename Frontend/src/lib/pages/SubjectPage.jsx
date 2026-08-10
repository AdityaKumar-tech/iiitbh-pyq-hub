// src/pages/SubjectPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import SubjectHeader from "../components/SubjectHeader";
import Tabs from "../components/Tabs";
import ResourceList from "../components/ResourceList";
import OverviewPanel from "../components/OverviewPanel";

import pyqData from "../data/pyq-data.json";
import { fetchPYQsFromDrive } from "../lib/driveApi";

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
  
  const [activeTab, setActiveTab] = useState("overview");
  const [pyqs, setPyqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Find subject from pyq-data.json
  const semesterData = pyqData.semesters.find(s => s.semester_number === parseInt(id));
  const rawSubject = semesterData?.subjects.find(s => s.subject_code.toLowerCase() === subjectSlug);

  const subject = rawSubject ? {
    name: rawSubject.subject_name,
    code: rawSubject.subject_code,
    instructor: "Unknown Instructor",
    description: "",
    counts: { notes: 0, pyqs: pyqs.length, assignments: 0, labs: 0, books: 0 },
    notes: [],
    pyqs: pyqs,
    assignments: [],
    labs: [],
    books: [],
    recent: []
  } : null;

  useEffect(() => {
    if (rawSubject && rawSubject.folder_id) {
      setIsLoading(true);
      setFetchError(null);
      fetchPYQsFromDrive(rawSubject.folder_id).then(res => {
        if (res && res.error) {
          setFetchError(res.error);
          setPyqs([]);
        } else {
          setPyqs(res || []);
        }
        setIsLoading(false);
      });
    }
  }, [rawSubject?.folder_id]);

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
        {["notes", "assignments", "labs", "books"].includes(activeTab) && (
          <ResourceList items={subject[activeTab]} type={activeTab} />
        )}
        {activeTab === "pyqs" && (
          isLoading ? (
            <div className="text-center py-20 text-sm text-muted">Loading PYQs from Google Drive...</div>
          ) : fetchError ? (
            <div className="text-center py-20 text-sm text-red-500 font-medium">Error: {fetchError}</div>
          ) : (
            <ResourceList items={pyqs} type="pyqs" />
          )
        )}
      </div>
    </div>
  );
}