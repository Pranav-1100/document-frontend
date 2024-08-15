'use client'

import { useState, useEffect } from 'react'
import { getDocumentTypes, createDocumentType, updateDocumentType, deleteDocumentType } from '../../utils/api'

export default function DocumentTypes() {
  const [types, setTypes] = useState([])
  const [newTypeName, setNewTypeName] = useState('')
  const [newTypeDescription, setNewTypeDescription] = useState('')

  useEffect(() => {
    fetchDocumentTypes()
  }, [])

  const fetchDocumentTypes = async () => {
    try {
      const data = await getDocumentTypes()
      setTypes(data)
    } catch (error) {
      console.error('Failed to fetch document types:', error)
    }
  }

  const handleCreateType = async (e) => {
    e.preventDefault()
    try {
      await createDocumentType(newTypeName, newTypeDescription)
      setNewTypeName('')
      setNewTypeDescription('')
      fetchDocumentTypes()
    } catch (error) {
      console.error('Failed to create document type:', error)
    }
  }

  const handleUpdateType = async (id, name, description) => {
    try {
      await updateDocumentType(id, name, description)
      fetchDocumentTypes()
    } catch (error) {
      console.error('Failed to update document type:', error)
    }
  }

  const handleDeleteType = async (id) => {
    try {
      await deleteDocumentType(id)
      fetchDocumentTypes()
    } catch (error) {
      console.error('Failed to delete document type:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">Document Types</h1>
      <form onSubmit={handleCreateType} className="mb-8">
        <input
          type="text"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          placeholder="New type name"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          value={newTypeDescription}
          onChange={(e) => setNewTypeDescription(e.target.value)}
          placeholder="New type description"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-accent text-white p-2 rounded">Create Type</button>
      </form>
      <div className="space-y-4">
        {types.map((type) => (
          <div key={type.id} className="bg-surface p-4 rounded">
            <h3 className="text-xl font-semibold">{type.name}</h3>
            <p className="text-gray-400">{type.description}</p>
            <div className="mt-2">
              <button onClick={() => handleUpdateType(type.id, prompt('New name', type.name), prompt('New description', type.description))} className="bg-blue-500 text-white p-2 rounded mr-2">Update</button>
              <button onClick={() => handleDeleteType(type.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}