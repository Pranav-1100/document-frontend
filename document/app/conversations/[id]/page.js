'use client'

import { useState, useEffect } from 'react'
import { getConversation, addMessageToConversation } from '../../../utils/api'
import { FiSend } from 'react-icons/fi'

export default function Conversation({ params }) {
  const [conversation, setConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    fetchConversation()
  }, [params.id])

  const fetchConversation = async () => {
    try {
      const data = await getConversation(params.id)
      setConversation(data)
    } catch (error) {
      console.error('Failed to fetch conversation:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      await addMessageToConversation(params.id, newMessage)
      setNewMessage('')
      fetchConversation()
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  if (!conversation) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">{conversation.title}</h1>
      <div className="bg-surface p-4 rounded mb-4 h-96 overflow-y-auto">
        {conversation.messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-primary px-2 py-1 rounded text-text">
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2 p-2 border rounded bg-background text-text"
        />
        <button type="submit" className="bg-accent text-white p-2 rounded hover:bg-blue-600 transition duration-300">
          <FiSend />
        </button>
      </form>
    </div>
  )
}