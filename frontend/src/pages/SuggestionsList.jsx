import React, { useEffect, useState } from 'react'
import SuggestionCard from '../components/SuggestionCard'

const SuggestionsList = () => {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('suggestions') || '[]')
    setSuggestions(stored.reverse()) // Show newest first
  }, [])

  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">All Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No suggestions submitted yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((sugg, idx) => (
            <SuggestionCard key={idx} suggestion={sugg} />
          ))}
        </div>
      )}
    </section>
  )
}

export default SuggestionsList