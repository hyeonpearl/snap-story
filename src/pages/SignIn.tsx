import { Form } from '../_zlib/components/Form';
import { Icon } from '../_zlib/components/Icon';
import { Input } from '../_zlib/components/Input';
import { Spacing } from '../_zlib/components/Spacing';
import { Txt } from '../_zlib/components/Txt';
import { Wrapper } from '../_zlib/components/Wrapper';
import useSignIn from '../_zlib/hooks/useSignIn';

export default function SignIn() {
  const { isLoading, form, error, onChange, onSubmit, moveToSignUp } =
    useSignIn();

  return (
    <>
      <Wrapper type={'form'}>
        <Icon src='/z.svg' width={250} height={250} />
        <Txt typography={'h1'}>로그인하기</Txt>
        <Spacing direction='vertical' size={50} />

        <Form onSubmit={onSubmit}>
          <Input
            name={'email'}
            value={form.email}
            placeholder={'이메일'}
            type={'email'}
            onChange={onChange}
            required
          />
          <Input
            name={'password'}
            value={form.password}
            placeholder={'비밀번호'}
            type={'password'}
            onChange={onChange}
            required
          />
          <Input
            value={isLoading ? '로그인 중...' : '로그인'}
            type={'submit'}
            required
          />
          {error ? <Txt typography='error'>{error}</Txt> : null}
          <Spacing direction='vertical' size={20} />

          <Wrapper>
            <Txt typography='p'>계정이 없으신가요?</Txt>
            <Spacing direction='horizontal' size={10} />
            <Txt typography='anker' onClick={moveToSignUp}>
              가입하기
            </Txt>
          </Wrapper>
        </Form>
      </Wrapper>
    </>
  );
}
