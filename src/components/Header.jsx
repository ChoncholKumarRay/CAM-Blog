import { CornerUpLeft, Edit, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import blogLogo from "../assets/blog-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between font-roboto">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src={blogLogo}
            alt="CAM-SUST Blog"
            className="h-6 w-auto object-contain md:h-6"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Back to CAM-SUST */}
          <a
            href="https://cam-sust.org"
            className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
          >
            <CornerUpLeft className="w-4 h-4" />
            <span>Back to CAM-SUST</span>
          </a>

          {/* Blog */}
          <button
            onClick={() => navigate("/")}
            className={`transition-colors flex items-center space-x-2 ${
              getActive("/") ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            <span>Blog</span>
          </button>

          {/* Tips */}
          <button
            onClick={() => navigate("/tips")}
            className={`transition-colors flex items-center space-x-2 ${
              getActive("/tips")
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span>Tips</span>
          </button>

          {/* Instruction */}
          <button
            onClick={() => navigate("/instruction")}
            className={`transition-colors flex items-center space-x-2 ${
              getActive("/instruction")
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span>Instruction</span>
          </button>

          {/* Contribute */}
          <button
            onClick={() => navigate("/contribute")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              getActive("/contribute")
                ? "bg-indigo-700 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <Edit size={18} />
            <span className="font-medium">Contribute</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-200 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 px-4 py-3 space-y-3">
          <a
            href="https://cam-sust.org"
            className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
          >
            <CornerUpLeft className="w-4 h-4" />
            <span>Back to CAM-SUST</span>
          </a>

          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className={`block w-full text-left ${
              getActive("/") ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            Blog
          </button>

          <button
            onClick={() => {
              navigate("/tips");
              setMenuOpen(false);
            }}
            className={`block w-full text-left ${
              getActive("/tips")
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Tips
          </button>

          <button
            onClick={() => {
              navigate("/instruction");
              setMenuOpen(false);
            }}
            className={`block w-full text-left ${
              getActive("/instruction")
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Instruction
          </button>

          <button
            onClick={() => {
              navigate("/contribute");
              setMenuOpen(false);
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Contribute
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
