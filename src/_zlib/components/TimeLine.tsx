import Tweet from './Tweet';
import useTweets from '../hooks/useTweets';

export default function TimeLine() {
  const { user, tweets, onDelete } = useTweets();

  return (
    <>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} user={user} onDelete={onDelete} />
      ))}
    </>
  );
}
