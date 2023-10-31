import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC6oKblvapCXVocLJBf2LPlqcM-YYy4O6g',
  authDomain: 'zwitter-app.firebaseapp.com',
  projectId: 'zwitter-app',
  storageBucket: 'zwitter-app.appspot.com',
  messagingSenderId: '496879371330',
  appId: '1:496879371330:web:b44355af0e8d64de3b59db',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const database = getFirestore(app);
