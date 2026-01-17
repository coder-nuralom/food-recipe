import React from "react";
import { Link } from "react-router-dom";
import { Globe, Loader } from "lucide-react";
import { useFetch } from "./useFetch";
import { API_URL } from "./useFetch";

const Cuisine = () => {
  const { data, loading, error } = useFetch(`${API_URL}list.php?a=list`);
  const availableArea = data?.meals;

  return (
    <div className="bg-gray-900/80 border-b border-gray-800 shadow-inner shadow-black/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-x-4 sm:gap-x-6 md:gap-x-10">
          {/* whitespace-nowrap overflow-x-auto */}
          <div className="py-4 shrink-0 flex items-center gap-x-2 text-yellow-400 font-bold text-lg">
            <Globe />
            <h3 className="">Global Cuisine:</h3>
          </div>
          <div className="flex no-scrollbar overflow-x-auto space-x-4 whitespace-nowrap py-4">
            {error && <h1 className="text-red-500">{error}</h1>}
            {loading ? (
              <div className="text-center py-4 text-gray-300">
                <Loader
                  size={30}
                  className="animate-spin inline-block mr-2 text-blue-400"
                />
                <span>Loading....</span>
              </div>
            ) : (
              availableArea?.slice(0, 10).map((item, index) => (
                <Link
                  to={`/search/area/${item.strArea}`}
                  key={index}
                  className="cursor-pointer text-gray-200 text-sm font-medium hover:text-white transition duration-200 py-1.5 px-4 rounded-full bg-gray-800 border border-gray-700 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-800/50"
                >
                  {item.strArea}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuisine;
