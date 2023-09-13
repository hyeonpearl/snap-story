import { Button } from '../_zlib/components/common/Button';
import { Form } from '../_zlib/components/common/Form';
import { Input } from '../_zlib/components/common/Input';
import { LineBreak } from '../_zlib/components/common/LineBreak';
import { Wrapper } from '../_zlib/components/common/Wrapper';

export default function Home() {
  return (
    <Wrapper className='home'>
      <Wrapper className='post-tweet'>
        <Form className='post-tweet'>
          <Input.TextField
            placeholder='무슨 일이 일어나고 있나요?'
            rows={3}
            maxLength={180}
            required
          />
          <LineBreak.Hr />

          <Wrapper className='buttons'>
            <Input.Label htmlFor='file'>
              <svg
                fill='none'
                stroke='#1d9bf0'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                />
              </svg>
            </Input.Label>
            <Input id='file' type='file' accept='image/*' />
            <Button className='primary' type='submit'>
              게시하기
            </Button>
          </Wrapper>
        </Form>
      </Wrapper>
    </Wrapper>
  );
}
