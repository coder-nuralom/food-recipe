import React from "react";

const Pagination = ({
  currentPageNumber,
  setCurrentPageNumber,
  totalPages,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
      <button
        disabled={currentPageNumber === 1}
        onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
        className="px-4 py-1 text-sm sm:text-base rounded-full border border-white/20 text-white 
      disabled:opacity-40 hover:bg-white hover:text-black transition"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPageNumber(page)}
            className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full border ${
              currentPageNumber === page
                ? "bg-cyan-400 text-black"
                : "border-white/20 text-white hover:bg-white hover:text-black"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPageNumber === totalPages}
        onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
        className="px-4 py-1 text-sm sm:text-base rounded-full border border-white/20 text-white 
      disabled:opacity-40 hover:bg-white hover:text-black transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
