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

export default function SignUp() {
  const {
    isLoading,
    form,
    error,
    handleFormChange,
    handleSignUp,
    handleSignInGithub,
    moveToSignIn,
  } = useSign();

  return (
    <>
      {isLoading ? (
        <Loading text='계정 만드는 중...' />
      ) : (
        <Wrapper className='sign-form'>
          <Icon src='/z.svg' width={200} height={200} />
          <Spacing direction='vertical' size={30} />
          <Txt typography='h1'>지금 가입하세요.</Txt>
          <Spacing direction='vertical' size={30} />

          <Wrapper className='form'>
            <Button className='social' onClick={handleSignInGithub}>
              <Icon src='github.svg' width={20} height={20} />
              Github로 가입하기
            </Button>
          </Wrapper>

          <Spacing direction='vertical' size={20} />
          <LineBreak text='또는' />
          <Spacing direction='vertical' size={20} />

          <Form className='sign-form' onSubmit={handleSignUp}>
            <Input
              name='name'
              placeholder='이름'
              type='text'
              value={form.name}
              onChange={handleFormChange}
              required
            />
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
              계정 만들기
            </Button>
            {error ? (
              <Txt typography='p' color={colors.red01}>
                {error}
              </Txt>
            ) : null}
            <Spacing direction='vertical' size={20} />

            <Txt typography='h4'>이미 가입하셨나요?</Txt>
            <Spacing direction='vertical' size={5} />
            <Button className='secondary' onClick={moveToSignIn}>
              로그인
            </Button>
          </Form>
        </Wrapper>
      )}
    </>
  );
}
