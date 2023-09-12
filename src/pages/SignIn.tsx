import { Button } from '../_zlib/components/common/Button';
import { Form } from '../_zlib/components/common/Form';
import { Icon } from '../_zlib/components/common/Icon';
import { Input } from '../_zlib/components/common/Input';
import { LineBreak } from '../_zlib/components/common/LineBreak';
import { Spacing } from '../_zlib/components/common/Spacing';
import { Txt } from '../_zlib/components/common/Txt';
import { Wrapper } from '../_zlib/components/common/Wrapper';
import useSignIn from '../_zlib/hooks/useSignIn';

export default function SignIn() {
  const {
    isLoading,
    form,
    error,
    onChange,
    onSubmit,
    onSignInGithub,
    moveToSignUp,
  } = useSignIn();

  return (
    <>
      <Wrapper type={'page'}>
        <Icon src='/z.svg' width={250} height={250} />
        <Txt typography={'h1'}>로그인하기</Txt>
        <Spacing direction='vertical' size={50} />

        <Wrapper type='form'>
          <Button styled={'social'} onClick={onSignInGithub}>
            <Icon src='github.svg' width={20} height={20} />
            Github로 로그인하기
          </Button>
        </Wrapper>

        <Spacing direction='vertical' size={20} />
        <LineBreak text='또는' />
        <Spacing direction='vertical' size={20} />

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
          <Button styled={'primary'} type={'submit'} required>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
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
