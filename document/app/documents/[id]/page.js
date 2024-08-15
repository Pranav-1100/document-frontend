'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getDocument, summarizeDocument, deleteDocument } from '../../../utils/api'
import { FiMessageSquare, FiTrash2 } from 'react-icons/fi'

export default function Document({ params }) {
  const [document, setDocument] = useState(null)
  const [summary, setSummary] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await getDocument(params.id)
        setDocument(data)
      } catch (error) {
        console.error('Failed to fetch document:', error)
      }
    }
    fetchDocument()
  }, [params.id])

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

}