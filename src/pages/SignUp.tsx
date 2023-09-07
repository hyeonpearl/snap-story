import React, { useState } from 'react';

import Wrapper from '../_zlib/components/Wrapper';
import Form from '../_zlib/components/Form';
import Input from '../_zlib/components/Input';
import Txt from '../_zlib/components/Txt';

export default function SignUp() {
  const initialForm = { name: '', email: '', password: '' };
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 계정 생성
      // 사용자 이름 설정
      // 홈페이지로 redirect
      console.log(form);
    } catch (error) {
      // setError
      console.log(error);
    } finally {
      // setLoading(false)
    }
  };

  return (
    <Wrapper type={'form'}>
      <Txt typography={'title'}>지금 일어나고 있는 일</Txt>
      <Form onSubmit={onSubmit}>
        <Input
          name={'name'}
          placeholder={'이름'}
          value={form.name}
          type={'text'}
          onChange={onChange}
          required
        />
        <Input
          name={'email'}
          placeholder={'이메일'}
          value={form.email}
          type={'email'}
          onChange={onChange}
          required
        />
        <Input
          name={'password'}
          placeholder={'비밀번호'}
          value={form.password}
          type={'password'}
          onChange={onChange}
          required
        />
        <Input value={'계정 만들기'} type={'submit'} required />
      </Form>
      {error ? <Txt typography='error'>{error}</Txt> : null}
    </Wrapper>
  );
}
