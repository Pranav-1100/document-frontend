'use client'

import { useState } from 'react'
import { login } from '../../../utils/api'
import { FiMail, FiLock } from 'react-icons/fi'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password)
      console.log('Login successful:', data)
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login failed:', error)
      // Handle login error (e.g., show error message)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-accent">Login</h1>
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-lg shadow-lg">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Login
        </button>
      </form>
    </div>
  )
}