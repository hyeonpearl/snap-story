import { User } from 'firebase/auth';
import { Wrapper } from './common/Wrapper';
import Tweet from './Tweet';
import { TweetType } from '../hooks/useTweets';

export default function TimeLine({
  user,
  tweets,
}: {
  user: User | null;
  tweets: TweetType[];
}) {
  return (
    <Wrapper className='column'>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} user={user} />
      ))}
    </Wrapper>
  );
}
