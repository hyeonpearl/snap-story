import React from 'react';
import ReactDOM from 'react-dom/client';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';
import { auth } from '@/server/firebase';
import App from './App';
import './index.css';

const initializeApp = async () => {
  await setPersistence(auth, browserSessionPersistence);
  await auth.authStateReady();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initializeApp();
