import { Wrapper } from './_zlib/components/common/Wrapper';
import Loading from './_zlib/components/Loading';
import PageLayout from './_zlib/components/PageLayout';
import ProtectedRoute from './_zlib/components/ProtectedRoute';
import { auth } from './_zlib/server/firebase';
import GlobalStyles from './_zlib/styles/GlobalStyles';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

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
  { path: '/', element: <SignUp /> },
  { path: '/signin', element: <SignIn /> },
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
    <>
      <Wrapper>
        <GlobalStyles />
        {isLoading ? <Loading /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  );
}
