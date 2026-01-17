import React, { useState } from "react";
import { Search, Zap, ChartNoAxesGantt } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const hamburgerClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/search/recipe/${searchTerm}`);
    setSearchTerm("");
    setShowMenu(false); // mobile menu auto close
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-blue-900/50">
      <div className="container mx-auto px-4">
        <nav>
          <div className="flex items-center justify-between py-4">
            <Link
              to="/"
              className="flex items-center gap-x-2 text-2xl font-black text-white hover:text-blue-400 transition"
            >
              <Zap className="w-7 h-7 text-yellow-400 fill-yellow-400/20" />
              <span className="text-blue-400">Pro</span>Chef
            </Link>

            <form
              onSubmit={handleSubmit}
              className="hidden sm:flex w-full max-w-sm items-center"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search food or recipe..."
                className="h-10 flex-1 px-5 border border-gray-700 bg-gray-900 text-gray-50 rounded-l-full focus:outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="h-10 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-r-full hover:from-blue-700 hover:to-cyan-600 transition"
              >
                <Search size={22} />
              </button>
            </form>

            <ChartNoAxesGantt
              size={26}
              onClick={hamburgerClick}
              className={`sm:hidden cursor-pointer transition-transform duration-300
                ${showMenu ? "rotate-90" : ""}
              `}
            />
          </div>

          {/* 🔥 Mobile Search (Slides from header bottom) */}
          <div
            className={`sm:hidden overflow-hidden transition-all duration-300 ease-linear
              ${showMenu ? "max-h-40" : "max-h-0"}
            `}
          >
            <form onSubmit={handleSubmit} className="bg-gray-950 px-2 pb-6">
              <div className="flex items-center mt-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search food or recipe..."
                  className="h-10 w-full px-5 border border-gray-700 bg-gray-900 text-gray-50 rounded-l-full focus:outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-r-full"
                >
                  <Search size={22} />
                </button>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
