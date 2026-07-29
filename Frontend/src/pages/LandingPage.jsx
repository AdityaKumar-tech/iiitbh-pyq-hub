// src/pages/LandingPage.jsx
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SemesterGrid from "../components/SemesterGrid";
import RecentResources from "../components/RecentResources";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <HeroSection />
      <SemesterGrid />
      <RecentResources />
      {/* PopularSubjects, AnnouncementsPreview, Footer come next */}
    </div>
  );
}