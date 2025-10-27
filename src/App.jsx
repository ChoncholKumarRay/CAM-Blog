import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StarfieldBackground from "./components/StarfieldBackground";
import Header from "./components/Header";
import BlogPage from "./pages/BlogPage";
import TipsPage from "./pages/TipsPage";
import ContributePage from "./pages/ContributePage";
import InstructionPage from "./pages/InstructionPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import Footer from "./components/Footer";
import BlogAdminDashboard from "./pages/admin/BlogAdminDashboard";

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen">
        <StarfieldBackground />
        <Header />
        <div className="relative z-10 min-h-screen">
          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/contribute" element={<ContributePage />} />
            <Route path="/instruction" element={<InstructionPage />} />
            <Route path="/admin" element={<BlogAdminDashboard />} />
            <Route path="/:id" element={<BlogDetailPage />} />
          </Routes>
        </div>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </Router>
  );
};

export default App;
