import Wrapper from '../_zlib/components/Wrapper';
import Form from '../_zlib/components/Form';
import Input from '../_zlib/components/Input';
import Txt from '../_zlib/components/Txt';
import useSignUp from '../_zlib/hooks/useSignUp';

export default function SignUp() {
  const { form, error, onChange, onSubmit } = useSignUp();

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
