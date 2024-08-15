import Link from 'next/link'
import Button from '../components/Button'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to DocChat</h1>
      <p className="text-xl mb-8">
        Upload documents, chat about them, and get summaries with ease.
      </p>
      <div className="space-x-4">
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  )
}