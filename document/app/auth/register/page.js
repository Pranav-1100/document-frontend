'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { register } from '../../../utils/api'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const data = await register(username, email, password)
      localStorage.setItem('authToken', data.token)
      router.push('/') // Redirect to home page after successful registration
    } catch (error) {
      console.error('Registration failed:', error)
      setError('Registration failed. Please try again.')
    }
  }
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-accent">Register</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              id="username"
              type="text"
              className="w-full pl-10 pr-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent text-text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              id="email"
              type="email"
              className="w-full pl-10 pr-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent text-text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              id="password"
              type="password"
              className="w-full pl-10 pr-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent text-text"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link href="/auth/login" className="text-accent hover:underline">Login</Link>
      </p>
    </div>
  )
}