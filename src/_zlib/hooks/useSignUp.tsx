import { auth } from '../server/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    if (
      isLoading ||
      form.name === '' ||
      form.email === '' ||
      form.password === ''
    ) {
      return;
    }

    try {
      // 계정 생성
      const credentials = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(credentials.user);
      // 사용자 이름 설정
      await updateProfile(credentials.user, { displayName: form.name });
      // 홈으로 리다이렉트
      navigate('/home');
    } catch (error) {
      //   setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const moveToSignIn = () => navigate('/signin');

  return { form, error, onChange, onSubmit, moveToSignIn };
}
