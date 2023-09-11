import { Button } from '../_zlib/components/Button';
import { Form } from '../_zlib/components/Form';
import { Icon } from '../_zlib/components/Icon';
import { Input } from '../_zlib/components/Input';
import { LineBreak } from '../_zlib/components/LineBreak';
import { Spacing } from '../_zlib/components/Spacing';
import { Txt } from '../_zlib/components/Txt';
import { Wrapper } from '../_zlib/components/Wrapper';
import useSignUp from '../_zlib/hooks/useSignUp';

export default function SignUp() {
  const {
    isLoading,
    form,
    error,
    onChange,
    onSubmit,
    onSignInGithub,
    moveToSignIn,
  } = useSignUp();

  return (
    <>
      <Wrapper type={'page'}>
        <Icon src='/z.svg' width={250} height={250} />
        <Txt typography={'h1'}>지금 일어나고 있는 일</Txt>
        <Spacing direction='vertical' size={50} />
        <Txt typography={'h4'}>지금 가입하세요.</Txt>
        <Spacing direction='vertical' size={30} />

        <Wrapper type={'form'}>
          <Button styled={'social'} onClick={onSignInGithub}>
            <Icon src='github.svg' width={20} height={20} />
            Github로 가입하기
          </Button>
        </Wrapper>

        <Spacing direction='vertical' size={20} />
        <LineBreak text='또는' />
        <Spacing direction='vertical' size={20} />

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
          <Button styled={'primary'} type={'submit'} required>
            {isLoading ? '만드는 중...' : '계정 만들기'}
          </Button>
          {error ? <Txt typography='error'>{error}</Txt> : null}
          <Spacing direction={'vertical'} size={25} />

          <Txt typography='h4'>이미 가입하셨나요?</Txt>
          <Spacing direction='vertical' size={5} />
          <Button styled={'secondary'} onClick={moveToSignIn}>
            로그인
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}
