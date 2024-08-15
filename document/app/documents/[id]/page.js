'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getDocument, summarizeDocument, deleteDocument } from '../../../utils/api'
import { FiMessageSquare, FiTrash2 } from 'react-icons/fi'
import TagManager from '../../../components/TagManager'
import { withAuth } from '../../../utils/withAuth'

function Document({ params }) {
  const [document, setDocument] = useState(null)
  const [summary, setSummary] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchDocument()
  }, [params.id])

  const fetchDocument = async () => {
    try {
      const data = await getDocument(params.id)
      setDocument(data)
    } catch (error) {
      console.error('Failed to fetch document:', error)
    }
  }

  const handleSummarize = async () => {
    try {
      const data = await summarizeDocument(params.id)
      setSummary(data.summary)
    } catch (error) {
      console.error('Failed to summarize document:', error)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(params.id)
        router.push('/documents')
      } catch (error) {
        console.error('Failed to delete document:', error)
      }
    }
  }

  if (!document) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">{document.title}</h1>
      <div className="bg-surface p-6 rounded-lg shadow-lg mb-6">
        <p className="mb-4">{document.content}</p>
        <div className="flex justify-between items-center">
          <Link href={`/chat/${params.id}`} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
            <FiMessageSquare className="mr-2" />
            Chat about this document
          </Link>
          <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center">
            <FiTrash2 className="mr-2" />
            Delete Document
          </button>
        </div>
      </div>
      <TagManager documentId={params.id} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-accent">Document Summary</h2>
        {summary ? (
          <p className="bg-surface p-6 rounded-lg shadow-lg">{summary}</p>
        ) : (
          <button onClick={handleSummarize} className="bg-accent text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Generate Summary
          </button>
        )}
      </div>
    </div>
  )
}

export default withAuth(Document)