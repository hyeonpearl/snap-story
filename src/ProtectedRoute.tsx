import { Navigate } from 'react-router-dom';
import { user } from './lib/schema';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  if (user === null) {
    return <Navigate to='/' />;
  }
  return children;
}
