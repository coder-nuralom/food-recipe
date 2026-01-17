import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import RecipeDetails from "./pages/RecipeDetails";
import SearchView from "./pages/SearchView";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/search/:type/:query" element={<SearchView />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
