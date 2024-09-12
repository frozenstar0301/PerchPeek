import React from 'react';
import { useNavigate } from 'react-router-dom';

const TicketTable = ({ tickets, loading, error }) => {
  const sortedTickets = [...tickets].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const navigate = useNavigate();  // Use navigate to programmatically go to the ticket detail page

  if (loading) return <div className="text-center text-gray-600">Loading tickets...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (sortedTickets.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Tickets</h2>
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full bg-white shadow-md rounded my-6">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Subject</th>
          <th className="py-3 px-6 text-left">User</th>
          <th className="py-3 px-6 text-center">Status</th>
          <th className="py-3 px-6 text-center">New</th>  {/* Column for the "New" badge */}
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {sortedTickets.map((ticket, index) => (
          <tr
            key={ticket.id}
            className={`border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${ticket.isNew ? 'bg-yellow-100' : ''}`}  // Highlight new ticket, make row clickable
            onClick={() => navigate(`/ticket/${ticket.id}`)}  // Navigate to the detail page when the row is clicked
          >
            <td className="py-3 px-6 text-left">{ticket.subject}</td>
            <td className="py-3 px-6 text-left">{ticket.user ? ticket.user.name : 'Unknown User'}</td>
            <td className="py-3 px-6 text-center">
              <span className={`py-1 px-3 rounded-full text-xs ${ticket.status ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>
                {ticket.status ? 'Closed' : 'Open'}
              </span>
            </td>
            <td className="py-3 px-6 text-center">
              {ticket.isNew && (
                <span className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full">New</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
