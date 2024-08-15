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
}