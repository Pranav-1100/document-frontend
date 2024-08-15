'use client'

import { useState } from 'react'
import { register } from '../../../utils/api'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await register(username, email, password)
      console.log('Registration successful:', data)
      // Handle successful registration (e.g., store token, redirect)
    } catch (error) {
      console.error('Registration failed:', error)
      // Handle registration error (e.g., show error message)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-accent">Register</h1>
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              id="username"
              type="text"
              className="w-full pl-10 pr-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent"
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
              className="w-full pl-10 pr-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent"
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
              className="w-full pl-10 pr-3 py-2 rounded-md bg-background border border-gray-700 focus:outline-none focus:border-accent"
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
    </div>
  )
}