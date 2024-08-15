'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/auth/login');
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return <Component {...props} />;
  };
}