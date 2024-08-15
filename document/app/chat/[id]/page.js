'use client'

import { useState, useEffect, useRef } from 'react'
import { getDocument, streamChat } from '../../../utils/api'
import { FiSend } from 'react-icons/fi'

export default function Chat({ params }) {
  const [document, setDocument] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = { role: 'user', content: input }
    setMessages([...messages, newMessage])
    setInput('')

    try {
      const response = await streamChat(params.id, [...messages, newMessage])
      setMessages([...messages, newMessage, { role: 'assistant', content: response.message }])
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  if (!document) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">Chat about: {document.title}</h1>
      <div className="bg-surface p-6 rounded-lg shadow-lg mb-6 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-accent text-white' : 'bg-gray-700 text-white'}`}>
              {message.content}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-4 py-2 bg-background border border-gray-700 rounded-l-md focus:outline-none focus:border-accent"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300 flex items-center">
          <FiSend className="mr-2" />
          Send
        </button>
      </form>
    </div>
  )
}