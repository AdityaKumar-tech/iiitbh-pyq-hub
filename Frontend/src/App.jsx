// src/App.jsx — routing addition
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResourcesSemesterPage from "./pages/ResourcesSemesterPage";
import SubjectSelectionPage from "./pages/SubjectSelectionPage";
import SubjectPage from "./pages/SubjectPage";
import MentorsPage from "./pages/MentorsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/resources" element={<ResourcesSemesterPage />} />
      <Route path="/resources/:semesterId" element={<SubjectSelectionPage />} />
      <Route
        path="/resources/:semesterId/:subjectSlug"
        element={<SubjectPage />}
      />
      <Route path="/mentors" element={<MentorsPage />} />
    </Routes>
  );
}