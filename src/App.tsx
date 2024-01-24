import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NavigationBar } from '@/components/layout/NavigationBar';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import { auth } from '@/server/firebase';
import ProtectedRoute from '@/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <NavigationBar />
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <NavigationBar />
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
