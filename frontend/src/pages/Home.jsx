import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import AddSuggestion from './AddSuggestion';
import SuggestionList from './SuggestionList.jsx'; // Corrected line

// IMPORTANT: Replace with your contract's address and ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; 
const contractABI = [
  "event SuggestionAdded(uint id, address author, string text)",
  "function addSuggestion(string memory _text)",
  "function getAllSuggestions() public view returns (tuple(uint id, address author, string text)[] memory)"
];

const Home = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setError('');
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setAccount(accounts[0]);
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
      } catch (err) {
        setError('Failed to connect wallet.');
        console.error(err);
      }
    } else {
      setError('MetaMask is not installed. Please install it to use this dApp.');
    }
  };

  const fetchSuggestions = useCallback(async () => {
    if (contract) {
      setIsLoading(true);
      try {
        const fetchedSuggestions = await contract.getAllSuggestions();
        const formattedSuggestions = fetchedSuggestions.map(s => ({
            id: Number(s.id),
            author: s.author,
            text: s.text
        }));
        setSuggestions(formattedSuggestions.reverse());
      } catch (err) {
        setError('Failed to fetch suggestions.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [contract]);
  
  useEffect(() => {
    if (contract) {
      fetchSuggestions();
    }
  }, [contract, fetchSuggestions]);
  
  const addSuggestion = async (text) => {
    if (contract && text) {
      setError('');
      try {
        const tx = await contract.addSuggestion(text);
        setIsLoading(true);
        await tx.wait();
        fetchSuggestions();
      } catch (err) {
        setError('Transaction failed. Do you have enough gas?');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <p className="text-center mb-4">
            Connected as: <span className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">{account}</span>
          </p>
          <AddSuggestion addSuggestion={addSuggestion} isLoading={isLoading} />
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <SuggestionList suggestions={suggestions} isLoading={isLoading} />
        </div>
      ) : (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Suggestion Box!</h2>
            <p className="mb-6">Connect your wallet to read and add suggestions on the blockchain.</p>
            <button
                onClick={connectWallet}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
                Connect Wallet
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;