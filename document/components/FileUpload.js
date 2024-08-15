import { useState } from 'react'
import { uploadFile } from '../utils/api'
import { FiUpload } from 'react-icons/fi'

export default function FileUpload({ onFileUploaded }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    try {
      const data = await uploadFile(file)
      onFileUploaded(data)
      setFile(null)
    } catch (error) {
      console.error('File upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="mb-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer bg-surface text-text p-2 rounded inline-flex items-center mr-2">
        <FiUpload className="mr-2" />
        {file ? file.name : 'Choose file'}
      </label>
      <button 
        type="submit" 
        className="bg-accent text-white p-2 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}