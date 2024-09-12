import React from 'react';
import TicketTable from './TicketTable';
import Pagination from '../pagination/Pagination';

const TicketLists = ({ tickets, loading, error, page, setPage, totalPages }) => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Ticket Lists</h2>
      <TicketTable tickets={tickets} loading={loading} error={error} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default TicketLists;
