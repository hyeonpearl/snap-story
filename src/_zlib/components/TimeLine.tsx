import Tweet from './Tweet';
import useLoadTweets from '../hooks/useLoadTweets';

export default function TimeLine() {
  const { tweets } = useLoadTweets();

  return (
    <>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </>
  );
}
