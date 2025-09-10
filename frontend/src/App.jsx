import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";

export default function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  const addSuggestion = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSuggestions([...suggestions, input]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <MessageSquarePlus className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            Blockchain Suggestion Box
          </h1>
        </div>

        {/* Suggestion Form */}
        <form onSubmit={addSuggestion} className="flex gap-3 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="💡 Share your idea..."
            className="flex-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        {/* Suggestion List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {suggestions.length === 0 ? (
            <p className="text-gray-500 text-center italic">
              No suggestions yet. Be the first! 🚀
            </p>
          ) : (
            suggestions.map((s, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-xl border border-gray-200 shadow-sm"
              >
                {s}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
