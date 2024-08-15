import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import { AppProvider } from '../context/AppContext';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DocChat',
  description: 'Upload documents, chat about them, and get summaries with ease.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}