'use client'

import { useState, useEffect } from 'react'
import { getDocument, getConversation } from '../../../utils/api'
import { withAuth } from '../../../utils/withAuth'
import { useAppContext } from '../../../context/AppContext'
import ChatInterface from '../../../components/ChatInterface'

function Chat({ params }) {
  const [document, setDocument] = useState(null)
  const [initialMessages, setInitialMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const { fetchData } = useAppContext()

  useEffect(() => {
    fetchDocument()
    fetchMessages()
  }, [params.id])

  const fetchDocument = async () => {
    try {
      const data = await getDocument(params.id)
      setDocument(data)
    } catch (error) {
      console.error('Failed to fetch document:', error)
    }
  }

  const fetchMessages = async () => {
    try {
      const data = await getConversation(params.id)
      setInitialMessages(data.messages || [])
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!document) {
    return <div>Document not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-accent">Chat about: {document.title}</h1>
      <div className="flex-grow bg-surface rounded-lg shadow-lg overflow-hidden">
        <ChatInterface 
          documentId={params.id} 
          initialMessages={initialMessages}
          onChatComplete={fetchData} // To refresh global state after chat
        />
      </div>
    </div>
  )
}

export default withAuth(Chat)