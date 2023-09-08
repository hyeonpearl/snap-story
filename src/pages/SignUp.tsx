import { Form } from '../_zlib/components/Form';
import { Icon } from '../_zlib/components/Icon';
import { Input } from '../_zlib/components/Input';
import { Spacing } from '../_zlib/components/Spacing';
import { Txt } from '../_zlib/components/Txt';
import { Wrapper } from '../_zlib/components/Wrapper';
import useSignUp from '../_zlib/hooks/useSignUp';

export default function SignUp() {
  const { form, error, onChange, onSubmit, moveToSignIn } = useSignUp();

  return (
    <>
      <Wrapper type={'form'}>
        <Icon width={250} height={250} />
        <Txt typography={'h1'}>지금 일어나고 있는 일</Txt>
        <Spacing direction='vertical' size={50} />
        <Txt typography={'h4'}>지금 가입하세요.</Txt>
        <Spacing direction='vertical' size={30} />

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
          <Spacing direction={'vertical'} size={20} />

          <Txt typography='h4'>이미 가입하셨나요?</Txt>
          <Input value={'로그인'} type={'button'} onClick={moveToSignIn} />
        </Form>
        {error ? <Txt typography='error'>{error}</Txt> : null}
      </Wrapper>
    </>
  );
}
