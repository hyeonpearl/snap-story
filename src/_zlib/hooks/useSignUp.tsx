import React from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../server/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function useSignUp() {
  const initialForm = { name: '', email: '', password: '' };

  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const [error, setError] = React.useState('');

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
    )
      return;
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
      navigate('/');
    } catch (error) {
      //   setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { form, error, onChange, onSubmit };
}
