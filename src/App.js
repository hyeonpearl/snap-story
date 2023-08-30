import { useState } from 'react';

import { authService } from './_zlib/server/firebaseInstance';
import PageRouter from './_zlib/components/PageRouter';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(authService.currentUser);

  return <PageRouter isSignedIn={isSignedIn} />;
}
