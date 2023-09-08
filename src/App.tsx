import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PageLayout from './_zlib/components/PageLayout';
import Loading from './_zlib/components/Loading';
import Wrapper from './_zlib/components/Wrapper';
import GlobalStyles from './_zlib/styles/GlobalStyles';

import { auth } from './_zlib/server/firebase';

import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

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
  const [isLoading, setIsLoading] = React.useState(true);

  const initialFirebase = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  React.useEffect(() => {
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
