// src/pages/LandingPage.jsx

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SemesterGrid from "../components/SemesterGrid";
import RecentResources from "../components/RecentResources";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-300">

      <Navbar />

      <HeroSection />

      <SemesterGrid />

      <RecentResources />

      <Footer />

    </div>
  );
}