// src/pages/ResourcesSemesterPage.jsx
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import SemesterGrid from "../components/SemesterGrid";

export default function ResourcesSemesterPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <Breadcrumb trail={[{ label: "Resources" }]} />
        <PageHeader
          title="Resources"
          subtitle="Pick your semester to see subjects and study material"
        />
        <SemesterGrid />
      </div>
    </div>
  );
}