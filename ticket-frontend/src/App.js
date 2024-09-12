import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketLists from './components/tickets/TicketLists';
import TicketDetail from './components/tickets/TicketDetail';
import Stats from './components/Stats';
import Navbar from './components/layout/Navbar';
import useFetchTickets from './hooks/useFetchTickets';
import UserTickets from './components/tickets/UserTickets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [status, setStatus] = useState('open');
  const [page, setPage] = useState(1);

  const { tickets, totalPages, loading, error } = useFetchTickets(status, page, setPage);

  return (
    <Router>
      <Navbar setStatus={setStatus} />
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route
          path="/"
          element={
            <TicketLists
              tickets={tickets}
              loading={loading}
              error={error}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          }
        />
        <Route path="/ticket/:id" element={<TicketDetail />} />
        <Route path="/users" element={<UserTickets />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
};

export default App;
