/* src/components/pagination/Pagination.jsx */
import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
  const pageNumbers = [];

  const generatePages = () => {
    if (page > 2) {
      pageNumbers.push(1);
      pageNumbers.push('...');
    }

    for (let i = Math.max(1, page - 1); i <= Math.min(page + 1, totalPages); i++) {
      pageNumbers.push(i);
    }

    if (page < totalPages - 1) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  };

  generatePages();

  return (
    <div className="flex justify-center my-6">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="rounded-none mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-300 transform hover:scale-110"
      >
        {'<<'}
      </button>
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-none mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-300 transform hover:scale-110"
      >
        {'<'}
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' && setPage(number)}
          disabled={typeof number !== 'number'}
          className={`rounded-none mx-1 px-3 py-2 rounded-lg transition duration-300 transform hover:scale-105 ${
            number === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-300 transform hover:scale-110 rounded-none"
      >
        {'>'}
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className="mx-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-300 transform hover:scale-110 rounded-none"
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
