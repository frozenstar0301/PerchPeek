import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TicketService from '../services/TicketServices';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async ({ status, page }) => {
  const data = await TicketService.fetchTickets(status, page);
  return data;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    totalPages: 1,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = action.payload.data;
        state.totalPages = action.payload.last_page;
        state.status = 'succeeded';
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ticketsSlice.reducer;

