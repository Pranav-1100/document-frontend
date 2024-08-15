import Link from 'next/link'
import { FiUpload, FiMessageSquare } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6 text-accent">Welcome to DocChat</h1>
      <p className="text-xl mb-12">
        Upload documents, chat about them, and get summaries with ease.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/documents/upload" className="bg-surface p-8 rounded-lg hover:bg-primary transition duration-300">
          <FiUpload className="text-5xl mb-4 mx-auto text-accent" />
          <h2 className="text-2xl font-semibold mb-2">Upload Documents</h2>
          <p>Securely upload and manage your documents</p>
        </Link>
        <Link href="/documents" className="bg-surface p-8 rounded-lg hover:bg-primary transition duration-300">
          <FiMessageSquare className="text-5xl mb-4 mx-auto text-accent" />
          <h2 className="text-2xl font-semibold mb-2">Chat & Analyze</h2>
          <p>Interact with your documents using AI-powered chat</p>
        </Link>
      </div>
    </div>
  )
}