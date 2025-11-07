import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../../contexts/UserContext';
import Loader from '../loader';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { sessionId, isLoading } = useSession();

  if (isLoading) {
    return <Loader />;
  }

  if (sessionId) {
    return <Navigate to='/questions' replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
