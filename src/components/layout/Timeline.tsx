import { User } from 'firebase/auth';
import { ITweet } from '@/hooks';
import { Tweet } from './Tweet';

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
