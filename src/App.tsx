import { Wrapper } from './components/common/Wrapper';
import Loading from './components/common/Loading';
import PageLayout from './components/common/PageLayout';
import ProtectedRoute from './ProtectedRoute';
import { auth } from './server/firebase';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  { path: '/signin', element: <SignIn /> },
  { path: '/', element: <SignUp /> },
]);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const initialFirebase = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    initialFirebase();
  }, []);

  return (
    <Wrapper className='app'>
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}
