import { initializeApp } from 'firebase/app';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';

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

// Authentication Instance
export const auth = getAuth(app);

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const setUserProfile = async (user: User, name: string) => {
  return await updateProfile(user, { displayName: name });
};
