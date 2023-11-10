import { Button } from './common/Button';
import { Form } from './common/Form';
import { Icon } from './common/Icon';
import { Input } from './common/Input';
import { Spacing } from './common/Spacing';
import { Txt } from './common/Txt';
import { Wrapper } from './common/Wrapper';
import Loading from './Loading';
import colors from '../constants/colors';
import usePostTweet from '../hooks/usePostTweet';

export default function PostTweet() {
  const {
    isLoading,
    tweet,
    file,
    handleTweetChange,
    handleFileChange,
    handleSubmit,
  } = usePostTweet();

  return (
    <Wrapper className='post-tweet'>
      {isLoading ? (
        <Loading text='게시 중...' />
      ) : (
        <Form className='post-tweet' onSubmit={handleSubmit}>
          <Input.TextField
            placeholder='무슨 일이 일어나고 있나요?'
            value={tweet}
            onChange={handleTweetChange}
            rows={3}
            maxLength={180}
            required
          />

          <Wrapper className='buttons'>
            <Wrapper className='row'>
              <Input.Label htmlFor='file'>
                <Icon.Photo type={'stroke'} color={colors.primary} />
              </Input.Label>
              <Input
                id='file'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
              <Spacing direction={'horizontal'} size={10} />
              {file && (
                <Txt typography={'p'} color={colors.green01}>
                  파일이 업로드되었습니다.
                </Txt>
              )}
            </Wrapper>
            <Button className='primary' type='submit'>
              게시하기
            </Button>
          </Wrapper>
        </Form>
      )}
    </Wrapper>
  );
}
