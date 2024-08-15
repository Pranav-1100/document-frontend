import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import { AppProvider } from '../context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DocChat',
  description: 'Upload documents, chat about them, and get summaries with ease.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text min-h-screen`}>
        <AppProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  )
}