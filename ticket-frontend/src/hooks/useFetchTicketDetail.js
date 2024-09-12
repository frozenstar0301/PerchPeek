import { useEffect, useState } from 'react';
import TicketService from '../services/TicketServices';

const useFetchTicketDetail = (id) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const data = await TicketService.fetchTicketDetail(id);
        setTicket(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ticket details.');
        setLoading(false);
      }
    };

    fetchTicketDetail();
  }, [id]);

  return { ticket, loading, error };
};

export default useFetchTicketDetail;
