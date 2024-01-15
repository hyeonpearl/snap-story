import PageLayout from './components/common/PageLayout';
import ProtectedRoute from '@/ProtectedRoute';
import { auth } from '@/server/firebase';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
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
    <div className='h-screen'>
      <RouterProvider router={router} />
    </div>
  );
}
