import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            DApp Suggestion Box
          </h1>
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;