import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader, ChevronLeft } from "lucide-react";
import { API_URL } from "../components/useFetch";
import Pagination from "../components/Pagination";

const SearchView = () => {
  const { type, query } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setSearchResult([]);
      setLoading(true);
      setError(null);

      try {
        let response;
        if (type === "area") {
          response = await fetch(`${API_URL}filter.php?a=${query}`);
        } else if (type === "category") {
          response = await fetch(`${API_URL}filter.php?c=${query}`);
        } else {
          response = await fetch(`${API_URL}search.php?s=${query}`);
        }

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setSearchResult(data.meals || []);
      } catch (error) {
        setError(error.message || "Someting went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, query]);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="h-[70vh] flex items-center justify-center text-center text-gray-300">
            <Loader
              size={30}
              className="animate-spin inline-block mr-2 text-blue-400"
            />
            <span>Loading....</span>
          </div>
        ) : error ? (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center py-20">
            <h1 className="text-red-500 text-xl mb-5">{error}</h1>
            <Link
              to={"/"}
              className="text-yellow-400 hover:text-yellow-300 text-lg font-medium border border-yellow-400 py-2 px-5 rounded-full"
            >
              Back to Home
            </Link>
          </div>
        ) : searchResult.length > 0 ? (
          <>
            <Link
              to={"/"}
              className="text-yellow-400 hover:text-yellow-300 text-lg font-medium inline-flex items-center gap-x-1 mb-6"
            >
              <ChevronLeft className="w-6 h-6" />
              Back to Dashboard
            </Link>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 mt-10">
              {currentItems.map((item) => (
                <div
                  key={item.idMeal}
                  className="group bg-[#0b1220] overflow-hidden rounded-2xl  border border-white/10 
                    transition-all duration-300 
                   shadow-lg hover:shadow-cyan-500/20"
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-t-xl ">
                    <Link to={`/recipe/${item.idMeal}`}>
                      <img
                        src={item.strMealThumb}
                        alt={item.strMeal}
                        className="w-full h-55 max-[450px]:h-48 object-cover rounded-t-xl 
                       group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="space-y-5 px-4 pt-6 pb-8">
                    <h3 className="text-white font-semibold text-base line-clamp-1">
                      {item.strMeal}
                    </h3>

                    <Link
                      to={`/recipe/${item.idMeal}`}
                      className="w-full block text-center text-sm font-medium text-blue-400 
                       border border-cyan-400/40 rounded-full py-2
                       hover:bg-blue-400 hover:text-black
                       transition-all duration-300"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4">No Recipe Found!</h1>
            <Link
              to={"/"}
              className="text-yellow-400 hover:text-yellow-300 text-lg font-medium border border-yellow-400 py-2 px-5 rounded-full"
            >
              Back to Home
            </Link>
          </div>
        )}
        {totalPages > 1 && (
          <div className="my-12">
            <Pagination
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchView;
