import { useState } from 'react'
import { searchDocuments } from '../utils/api'
import Link from 'next/link'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const data = await searchDocuments(query)
      setResults(data)
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="mr-2 p-2 border rounded bg-background text-text"
        />
        <button type="submit" className="bg-accent text-white p-2 rounded hover:bg-blue-600 transition duration-300">Search</button>
      </form>
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-accent">Search Results</h2>
          <ul className="space-y-2">
            {results.map((doc) => (
              <li key={doc.id} className="bg-surface p-3 rounded hover:bg-primary transition duration-300">
                <Link href={`/documents/${doc.id}`}>
                  <span className="text-lg font-medium text-accent">{doc.title}</span>
                </Link>
                <p className="text-sm text-gray-400">{doc.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}