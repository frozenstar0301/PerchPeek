/* src/components/layout/Navbar.jsx */
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setStatus }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-md">
      <div className="flex justify-center space-x-4">
        <Link to="/" onClick={() => setStatus('open')}>
          <button className="rounded-none text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 transform hover:scale-110">
            Open Tickets
          </button>
        </Link>
        <Link to="/" onClick={() => setStatus('closed')}>
          <button className="rounded-none text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300 transform hover:scale-110">
            Closed Tickets
          </button>
        </Link>
        <Link to="/stats">
          <button className="rounded-none text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-300 transform hover:scale-110">
            Stats
          </button>
        </Link>
        <Link to="/users">
          <button className="rounded-none text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 transform hover:scale-110">
            User Tickets
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
