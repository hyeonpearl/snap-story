import Wrapper from '../_zlib/components/Wrapper';
import Form from '../_zlib/components/Form';
import Input from '../_zlib/components/Input';

export default function SignUp() {
  return (
    <Wrapper>
      <Form>
        <Input name={'name'} placeholder={'이름'} type={'text'} required />
        <Input name={'email'} placeholder={'이메일'} type={'email'} required />
        <Input
          name={'password'}
          placeholder={'비밀번호'}
          type={'password'}
          required
        />
        <Input type={'submit'} value={'계정 만들기'} required />
      </Form>
    </Wrapper>
  );
}
