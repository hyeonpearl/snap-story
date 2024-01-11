import { Button } from '../components/common/Button';
import { Form } from '../components/common/Form';
import { Icon } from '../components/common/Icon';
import { Input } from '../components/common/Input';
import { LineBreak } from '../components/common/LineBreak';
import { Spacing } from '../components/common/Spacing';
import { Txt } from '../components/common/Txt';
import { Wrapper } from '../components/common/Wrapper';
import Loading from '../components/common/Loading';
import colors from '../constants/colors';
import useSign from '../hooks/useSign';

export default function SignIn() {
  const {
    isLoading,
    form,
    error,
    handleFormChange,
    handleSignIn,
    handleSignInGithub,
    moveToSignUp,
  } = useSign();

  return (
    <>
      {isLoading ? (
        <Loading text='로그인 중...' />
      ) : (
        <Wrapper className='sign-form'>
          <Icon src='/z.svg' width={200} height={200} />
          <Spacing direction='vertical' size={30} />
          <Txt typography='h1'>로그인하기</Txt>
          <Spacing direction='vertical' size={30} />

          <Wrapper className='form'>
            <Button className='social' onClick={handleSignInGithub}>
              <Icon src='github.svg' width={20} height={20} />
              Github로 로그인하기
            </Button>
          </Wrapper>

          <Spacing direction='vertical' size={20} />
          <LineBreak text='또는' />
          <Spacing direction='vertical' size={20} />

          <Form className='sign-form' onSubmit={handleSignIn}>
            <Input
              name='email'
              placeholder='이메일'
              type='email'
              value={form.email}
              onChange={handleFormChange}
              required
            />
            <Input
              name='password'
              placeholder='비밀번호'
              type='password'
              value={form.password}
              onChange={handleFormChange}
              required
            />
            <Button className='primary' type='submit' required>
              로그인
            </Button>
            {error ? (
              <Txt typography='p' color={colors.red01}>
                {error}
              </Txt>
            ) : null}
            <Spacing direction='vertical' size={20} />

            <Wrapper className='row'>
              <Txt typography='p' color={colors.gray02}>
                계정이 없으신가요?
              </Txt>
              <Spacing direction='horizontal' size={10} />
              <Txt
                typography='anker'
                color={colors.primary}
                onClick={moveToSignUp}
              >
                가입하기
              </Txt>
            </Wrapper>
          </Form>
        </Wrapper>
      )}
    </>
  );
}
