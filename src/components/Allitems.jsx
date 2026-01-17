import React, { useState } from "react";
import Title from "./Title";
import { API_URL } from "./useFetch";
import { useFetch } from "./useFetch";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Allitems = () => {
  const { data, loading, error } = useFetch(`${API_URL}search.php?f=a`);
  const allItems = data?.meals || [];

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <Title text="All Trending Items" />
        {error && <h1 className="text-red-500">{error}</h1>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {loading ? (
            <div className="col-span-4 text-center p-8 text-gray-300">
              <Loader
                size={30}
                className="animate-spin inline-block mr-2 text-blue-400"
              />
              <span>Loading....</span>
            </div>
          ) : (
            currentItems.map((item) => (
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
                    to={`recipe/${item.idMeal}`}
                    className="w-full block text-center text-sm font-medium text-blue-400 
                 border border-cyan-400/40 rounded-full py-2
                 hover:bg-blue-400 hover:text-black
                 transition-all duration-300"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="mt-13 mb-3">
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

export default Allitems;
