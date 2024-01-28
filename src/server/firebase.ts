import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
await setPersistence(auth, browserSessionPersistence);

export const storage = getStorage(app);

export const db = getFirestore(app);
