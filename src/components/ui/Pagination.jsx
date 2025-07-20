import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 mb-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-full transition-all duration-200 ${
          currentPage === 1
            ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800/60 text-white hover:bg-gray-700/80 cursor-pointer hover:scale-105 backdrop-blur-sm border border-gray-600/50'
        }`}
      >
        ←
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            page === currentPage
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
              : typeof page === 'number'
              ? 'bg-gray-800/60 text-white hover:bg-gray-700/80 cursor-pointer hover:scale-105 backdrop-blur-sm border border-gray-600/50'
              : 'bg-transparent text-gray-400 cursor-default'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-full transition-all duration-200 ${
          currentPage === totalPages
            ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800/60 text-white hover:bg-gray-700/80 cursor-pointer hover:scale-105 backdrop-blur-sm border border-gray-600/50'
        }`}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;