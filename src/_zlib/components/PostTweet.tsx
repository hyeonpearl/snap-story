import { Button } from './common/Button';
import { Form } from './common/Form';
import { Icon } from './common/Icon';
import { Input } from './common/Input';
import { LineBreak } from './common/LineBreak';
import { Wrapper } from './common/Wrapper';
import colors from '../constants/colors';
import usePostTweet from '../hooks/usePostTweet';

export default function PostTweet() {
  const { isLoading, tweet, onChange, onFileChange } = usePostTweet();

  return (
    <Wrapper className='post-tweet'>
      <Form className='post-tweet'>
        <Input.TextField
          placeholder='무슨 일이 일어나고 있나요?'
          value={tweet}
          onChange={onChange}
          rows={3}
          maxLength={180}
          required
        />
        <LineBreak.Hr />

        <Wrapper className='buttons'>
          <Input.Label htmlFor='file'>
            <Icon.Photo color={colors.primary} />
          </Input.Label>
          <Input
            id='file'
            type='file'
            accept='image/*'
            onChange={onFileChange}
          />
          <Button className='primary' type='submit'>
            {isLoading ? '게시 중...' : '게시하기'}
          </Button>
        </Wrapper>
      </Form>
    </Wrapper>
  );
}
