import { Wrapper } from '../_zlib/components/common/Wrapper';
import PostTweet from '../_zlib/components/PostTweet';
import TimeLine from '../_zlib/components/TimeLine';
import Title from '../_zlib/components/Title';
import useTweets from '../_zlib/hooks/useTweets';

export default function Home() {
  const { user, tweets } = useTweets('all');

  return (
    <Wrapper className='page'>
      <Title title={'홈'} />
      <PostTweet />
      <TimeLine user={user} tweets={tweets} />
    </Wrapper>
  );
}
