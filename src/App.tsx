import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PageLayout from './_zlib/components/PageLayout';

import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import GlobalStyles from './_zlib/styles/GlobalStyles';

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
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}
