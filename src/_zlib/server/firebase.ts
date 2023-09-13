import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBuas3PZaBN_-spa_6s08n5y3bHP8VFm5M',
  authDomain: 'z-app-29616.firebaseapp.com',
  projectId: 'z-app-29616',
  storageBucket: 'z-app-29616.appspot.com',
  messagingSenderId: '703465153333',
  appId: '1:703465153333:web:f2e277b787fc61a43f627c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const database = getFirestore(app);
