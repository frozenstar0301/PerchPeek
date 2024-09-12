import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load stats.');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading stats...</div>;
  }

  if (error) {
    return <div className="text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Ticket System Stats</h2>
      <div className="space-y-4">
        <p className="text-lg"><strong>Total Tickets:</strong> {stats.total_tickets}</p>
        <p className="text-lg"><strong>Unprocessed Tickets:</strong> {stats.unprocessed_tickets}</p>
        <p className="text-lg">
          <strong>User with Most Tickets:</strong> {stats.user_with_most_tickets.name} ({stats.user_with_most_tickets.email}) - {stats.user_with_most_tickets.tickets_count} tickets
        </p>
        <p className="text-lg"><strong>Last Ticket Processed At:</strong> {new Date(stats.last_ticket_processed_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Stats;
