import { auth } from '../server/firebase';
import {
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

/**
 * @name 계정 생성 Hook
 * @description 입력 받은 데이터로 계정 생성
 */
export default function useSignUp() {
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  /**
   * @name Github 소셜 로그인 함수
   * @description Sign In hook에도 중복된 코드가 있음. 리팩토링 필요
   */
  const onSignInGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    }
  };
  const moveToSignIn = () => navigate('/signin');

  return {
    isLoading,
    form,
    error,
    onChange,
    onSubmit,
    onSignInGithub,
    moveToSignIn,
  };
}
