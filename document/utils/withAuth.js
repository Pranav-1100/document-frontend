import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/auth/login');
      }
    }, []);

    return <Component {...props} />;
  };
}