import { Navigate } from 'react-router-dom';

import { auth } from '../server/firebase';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (user === null) {
    return <Navigate to={'/'} />;
  }
  return children;
}
