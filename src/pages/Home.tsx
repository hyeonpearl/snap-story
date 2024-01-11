import { Wrapper } from '../components/common/Wrapper';
import PostTweet from '../components/tweet/PostTweet';
import TimeLine from '../components/tweet/TimeLine';
import Title from '../components/common/Title';
import useTweets from '../hooks/useTweets';

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
