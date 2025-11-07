import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../../contexts/UserContext';
import Loader from '../loader';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { sessionId, isLoading } = useSession();

  if (isLoading) {
    return <Loader />;
  }

  if (!sessionId) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
