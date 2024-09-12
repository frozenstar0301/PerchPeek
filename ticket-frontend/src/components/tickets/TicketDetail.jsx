import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchTicketDetail from '../../hooks/useFetchTicketDetail';

const TicketDetail = () => {
  const { id } = useParams();  // Get the ticket ID from the URL params

  const { ticket, loading, error } = useFetchTicketDetail(id);

  if (loading) return <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">Loading ticket details...</div>;
  if (error) return <div className="p-4 bg-red-100 text-red-600 rounded-lg shadow-md text-center">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Ticket Detail</h2>
      
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700"><strong>Subject:</strong> {ticket.subject}</p>
      </div>

      <div className="mb-4">
        <p className="text-lg text-gray-600"><strong>Content:</strong> {ticket.content}</p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700"><strong>User:</strong> {ticket.user.name} ({ticket.user.email})</p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700"><strong>Status:</strong> {ticket.status ? 'Closed' : 'Open'}</p>
      </div>

      <div className="mb-4">
        <p className="text-lg text-gray-600"><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <p className="text-lg text-gray-600"><strong>Updated At:</strong> {new Date(ticket.updated_at).toLocaleString()}</p>
      </div>

      {/* Add a link to go back to the ticket list */}
      <Link to="/">
        <button className="rounded-none px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Back to Ticket List
        </button>
      </Link>
    </div>
  );
};

export default TicketDetail;
