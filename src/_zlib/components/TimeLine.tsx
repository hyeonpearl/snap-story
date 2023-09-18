import { Wrapper } from './common/Wrapper';
import Tweet from './Tweet';
import useTweets from '../hooks/useTweets';

export default function TimeLine() {
  const { user, tweets } = useTweets();

  return (
    <Wrapper className='column'>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} user={user} />
      ))}
    </Wrapper>
  );
}
