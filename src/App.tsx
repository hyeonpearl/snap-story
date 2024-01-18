import { PageLayout } from '@/components/layout/PageLayout';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import { auth } from '@/server/firebase';
import ProtectedRoute from '@/ProtectedRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <PageLayout />
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <PageLayout />
        <Profile />
      </ProtectedRoute>
    ),
  },
  { path: '/', element: <Auth /> },
]);

export default function App() {
  const initialFirebase = async () => {
    await auth.authStateReady();
  };

  useEffect(() => {
    initialFirebase();
  }, []);

  return (
    <div className='w-screen h-screen'>
      <RouterProvider router={router} />
    </div>
  );
}
