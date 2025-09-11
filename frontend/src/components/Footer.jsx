import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-4 mt-8">
      <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} Suggestion Box. Built on the Blockchain.</p>
      </div>
    </footer>
  );
};

export default Footer;