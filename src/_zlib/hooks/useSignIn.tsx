import { auth } from '../server/firebase';
import {
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function useSignIn() {
  const initialForm = { email: '', password: '' };

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    switch (true) {
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  // useSignIn hook에 중복된 함수
  const onSignInGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    }
  };
  const moveToSignUp = () => navigate('/');

  return {
    isLoading,
    form,
    error,
    onChange,
    onSubmit,
    onSignInGithub,
    moveToSignUp,
  };
}
