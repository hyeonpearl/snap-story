import { Tweet } from './Tweet';
import { ITweet } from '@/hooks/Tweet/useLoadTweet';
import { User } from 'firebase/auth';

export function Timeline({
  user,
  tweets,
}: {
  user: User | null;
  tweets: ITweet[];
}) {
  return (
    <div className='w-full max-w-xl grid grid-cols-1 gap-4'>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} user={user} {...tweet} />
      ))}
    </div>
  );
}
