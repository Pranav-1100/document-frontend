'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getConversations, createConversation, deleteConversation } from '../../utils/api'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function Conversations() {
  const [conversations, setConversations] = useState([])
  const [newConversationTitle, setNewConversationTitle] = useState('')

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const data = await getConversations()
      setConversations(data)
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
    }
  }

  const handleCreateConversation = async (e) => {
    e.preventDefault()
    try {
      await createConversation(newConversationTitle)
      setNewConversationTitle('')
      fetchConversations()
    } catch (error) {
      console.error('Failed to create conversation:', error)
    }
  }

  const handleDeleteConversation = async (id) => {
    try {
      await deleteConversation(id)
      fetchConversations()
    } catch (error) {
      console.error('Failed to delete conversation:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">Conversations</h1>
      <form onSubmit={handleCreateConversation} className="mb-8">
        <input
          type="text"
          value={newConversationTitle}
          onChange={(e) => setNewConversationTitle(e.target.value)}
          placeholder="New conversation title"
          className="mr-2 p-2 border rounded bg-background text-text"
        />
        <button type="submit" className="bg-accent text-white p-2 rounded hover:bg-blue-600 transition duration-300">
          <FiPlus className="inline mr-1" /> Create Conversation
        </button>
      </form>
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="bg-surface p-4 rounded flex justify-between items-center">
            <Link href={`/conversations/${conversation.id}`}>
              <span className="text-lg font-medium text-accent">{conversation.title}</span>
            </Link>
            <button
              onClick={() => handleDeleteConversation(conversation.id)}
              className="text-red-500 hover:text-red-600 transition duration-300"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}