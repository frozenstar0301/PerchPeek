import axios from 'axios';

class TicketService {
  async fetchTickets(status, page) {
    const response = await axios.get(`/api/tickets/${status}?page=${page}`);
    return response.data;
  }

  async fetchTicketDetail(id) {
    const response = await axios.get(`/api/tickets/${id}`);
    return response.data;
  }

  async fetchStats() {
    const response = await axios.get('/api/stats');
    return response.data;
  }
}

export default new TicketService();  // Exporting a singleton instance
