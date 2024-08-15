import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-text">
          DocChat
        </Link>
        <div className="space-x-4">
          <Link href="/auth/login" className="text-text hover:text-accent">
            Login
          </Link>
          <Link href="/auth/register" className="text-text hover:text-accent">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;