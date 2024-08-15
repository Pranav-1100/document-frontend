'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getDocuments } from '../../utils/api'
import { FiFile, FiPlus } from 'react-icons/fi'
import { withAuth } from '../../utils/withAuth'

function Documents() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments()
      setDocuments(data)
    } catch (error) {
      console.error('Failed to fetch documents:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-accent">Your Documents</h1>
        <Link href="/documents/upload" className="bg-accent text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
          <FiPlus className="mr-2" />
          Upload New
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Link href={`/documents/${doc.id}`} key={doc.id} className="block">
            <div className="bg-surface p-6 rounded-lg hover:bg-primary transition duration-300">
              <FiFile className="text-4xl mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
              <p className="text-sm text-gray-400">{doc.description || 'No description'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default withAuth(Documents)