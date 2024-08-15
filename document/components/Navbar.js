'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/auth/login');
  };

  const AuthLinks = () => (
    <>
      <Link href="/auth/login" className="text-text hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
        Login
      </Link>
      <Link href="/auth/register" className="text-text hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
        Register
      </Link>
    </>
  );

  const UserLinks = () => (
    <>
      <Link href="/documents" className="text-text hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
        Documents
      </Link>
      <Link href="/documents/upload" className="text-text hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
        Upload
      </Link>
      <button onClick={handleLogout} className="text-text hover:text-accent px-3 py-2 rounded-md text-sm font-medium flex items-center">
        <FiLogOut className="mr-1" /> Logout
      </button>
    </>
  );

  return (
    <nav className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-accent">
              DocChat
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isLoggedIn ? <UserLinks /> : <AuthLinks />}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <Link href="/documents" className="text-text hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
                  Documents
                </Link>
                <Link href="/documents/upload" className="text-text hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
                  Upload
                </Link>
                <button onClick={handleLogout} className="text-text hover:text-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-text hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link href="/auth/register" className="text-text hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}