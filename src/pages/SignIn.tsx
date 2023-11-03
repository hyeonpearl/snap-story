import { Button } from '../_zlib/components/common/Button';
import { Form } from '../_zlib/components/common/Form';
import { Icon } from '../_zlib/components/common/Icon';
import { Input } from '../_zlib/components/common/Input';
import { LineBreak } from '../_zlib/components/common/LineBreak';
import { Spacing } from '../_zlib/components/common/Spacing';
import { Txt } from '../_zlib/components/common/Txt';
import { Wrapper } from '../_zlib/components/common/Wrapper';
import Loading from '../_zlib/components/Loading';
import colors from '../_zlib/constants/colors';
import useSign from '../_zlib/hooks/useSign';

export default function SignIn() {
  const {
    isLoading,
    form,
    error,
    onChange,
    onSignIn,
    onSignInGithub,
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
          <Txt typography={'h1'}>로그인하기</Txt>
          <Spacing direction={'vertical'} size={30} />

          <Wrapper className='form'>
            <Button className='social' onClick={onSignInGithub}>
              <Icon src='github.svg' width={20} height={20} />
              Github로 로그인하기
            </Button>
          </Wrapper>

          <Spacing direction={'vertical'} size={20} />
          <LineBreak text={'또는'} />
          <Spacing direction={'vertical'} size={20} />

          <Form className='sign-form' onSubmit={onSignIn}>
            <Input
              name='email'
              placeholder='이메일'
              type='email'
              value={form.email}
              onChange={onChange}
              required
            />
            <Input
              name='password'
              placeholder='비밀번호'
              type='password'
              value={form.password}
              onChange={onChange}
              required
            />
            <Button className='primary' type='submit' required>
              로그인
            </Button>
            {error ? (
              <Txt typography={'p'} color={colors.red01}>
                {error}
              </Txt>
            ) : null}
            <Spacing direction={'vertical'} size={20} />

            <Wrapper className='row'>
              <Txt typography={'p'} color={colors.gray02}>
                계정이 없으신가요?
              </Txt>
              <Spacing direction={'horizontal'} size={10} />
              <Txt
                typography={'anker'}
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
