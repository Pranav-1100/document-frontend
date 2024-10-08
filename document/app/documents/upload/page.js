'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createDocument } from '../../../utils/api'
import { FiUpload } from 'react-icons/fi'
import { withAuth } from '../../../utils/withAuth'

function UploadDocument() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createDocument(title, content)
      router.push('/documents')
    } catch (error) {
      console.error('Failed to create document:', error)
      setError('Failed to create document. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">Upload New Document</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">Document Title</label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent text-text"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium mb-2">Document Content</label>
          <textarea
            id="content"
            className="w-full px-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent h-64 text-text"
            placeholder="Enter document content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center">
          <FiUpload className="mr-2" />
          Create Document
        </button>
      </form>
    </div>
  )
}

export default withAuth(UploadDocument)