import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import PageLayout from './_zlib/components/PageLayout';
import Loading from './_zlib/components/Loading';
import GlobalStyles from './_zlib/styles/GlobalStyles';

import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { auth } from './_zlib/server/firebase';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  { path: 'signup', element: <SignUp /> },
  { path: 'signin', element: <SignIn /> },
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
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </>
  );
}
