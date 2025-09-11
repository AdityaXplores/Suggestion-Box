import React from 'react';

const SuggestionCard = ({ suggestion }) => {
  // Function to shorten the author's address for display
  const shortenAddress = (address) => {
    if (!address) return 'Anonymous';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <p className="text-gray-800 dark:text-gray-200 mb-4 text-lg">
        "{suggestion.text}"
      </p>
      <div className="text-right">
        <span className="text-sm font-mono text-indigo-500 dark:text-indigo-400">
          - {shortenAddress(suggestion.author)}
        </span>
      </div>
    </div>
  );
};

export default SuggestionCard;