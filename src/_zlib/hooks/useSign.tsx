import { auth } from '../server/firebase';
import {
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function useSign() {
  const initialForm = { name: '', email: '', password: '' };

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    switch (true) {
      case name === 'name': {
        setForm(prev => ({ ...prev, name: value }));
        break;
      }
      case name === 'email': {
        setForm(prev => ({ ...prev, email: value }));
        break;
      }
      case name === 'password': {
        setForm(prev => ({ ...prev, password: value }));
        break;
      }
      default: {
        return;
      }
    }
  };

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (
      isLoading ||
      form.name === '' ||
      form.email === '' ||
      form.password === ''
    )
      return;

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(credentials.user, { displayName: form.name });
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || form.email === '' || form.password === '') return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onSignInGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    }
  };
  const onSignOut = async () => {
    const ok = confirm('로그아웃하시겠습니까?');
    if (ok) {
      await auth.signOut();
      navigate('/signin');
    }
  };

  const moveToSignUp = () => navigate('/');
  const moveToSignIn = () => navigate('/signin');

  return {
    isLoading,
    form,
    error,
    onChange,
    onSignUp,
    onSignIn,
    onSignInGithub,
    onSignOut,
    moveToSignUp,
    moveToSignIn,
  };
}
