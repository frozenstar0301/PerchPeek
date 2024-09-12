import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketTable from './TicketTable';
import Pagination from '../pagination/Pagination';  // Make sure you have a Pagination component

const UserTickets = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load users.');
      }
    };
    fetchUsers();
  }, []);

  // Fetch tickets when a user is selected or the page changes
  useEffect(() => {
    if (selectedUser) {
      const fetchTickets = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/users/${selectedUser}/tickets?page=${currentPage}`);
          setTickets(response.data.data);  // Get ticket data from response
          setTotalPages(response.data.last_page);  // Update total pages
          setLoading(false);
        } catch (err) {
          setError('Failed to load tickets.');
          setLoading(false);
        }
      };
      fetchTickets();
    }
  }, [selectedUser, currentPage]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">User Tickets</h2>

      {/* Dropdown to select a user */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">Select User:</label>
        <select
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            setCurrentPage(1);  // Reset to the first page when user changes
          }}
          className="border border-gray-300 rounded-md p-2 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Ticket table */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center text-gray-500">Loading tickets...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <TicketTable tickets={tickets} loading={loading} error={error} />
            <div className="mt-4">
              <Pagination
                page={currentPage}
                setPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserTickets;
