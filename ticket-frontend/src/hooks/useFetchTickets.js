import { useEffect, useState } from 'react';
import TicketService from '../services/TicketServices';
import Echo from '../services/echo';
import { toast } from 'react-toastify';

const useFetchTickets = (status, page, setPage) => {
  const [tickets, setTickets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await TicketService.fetchTickets(status, page);
        setTickets(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tickets.');
        setLoading(false);
      }
    };

    fetchTickets();
  }, [status, page]);

  useEffect(() => {
    const channel = Echo.channel('tickets');

    channel.listen('.ticketCreated', (event) => {
      toast.success(`New ticket created: ${event.ticket.subject}`);

      const newTicket = { ...event.ticket, isNew: true };  // Add `isNew` flag to mark the new ticket

      if (page !== 1) {
        setPage(1); // Switch to the first page
      } else {
        setTickets((prevTickets) => {
          const newTicketList = [newTicket, ...prevTickets];
          return newTicketList.slice(0, prevTickets.length);
        });
      }
    });

    return () => {
      Echo.leaveChannel('tickets');
    };
  }, [page, setPage]);

  return { tickets, totalPages, loading, error };
};

export default useFetchTickets;
