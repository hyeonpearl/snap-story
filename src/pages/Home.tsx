import { Wrapper } from '../_zlib/components/common/Wrapper';
import PostTweet from '../_zlib/components/PostTweet';
import TimeLine from '../_zlib/components/TimeLine';
import useTweets from '../_zlib/hooks/useTweets';

export default function Home() {
  const { user, tweets } = useTweets();

  return (
    <Wrapper className='home'>
      <PostTweet />
      <TimeLine user={user} tweets={tweets} />
    </Wrapper>
  );
}
