import { Wrapper } from '../_zlib/components/common/Wrapper';
import PostTweet from '../_zlib/components/tweet/PostTweet';
import TimeLine from '../_zlib/components/tweet/TimeLine';
import Title from '../_zlib/components/common/Title';
import useTweets from '../_zlib/hooks/useTweets';

export default function Home() {
  const { user, tweets } = useTweets('all');

  return (
    <Wrapper className='page'>
      <Title title='홈' />
      <PostTweet />
      <TimeLine user={user} tweets={tweets} />
    </Wrapper>
  );
}
