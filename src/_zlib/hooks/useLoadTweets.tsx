import { database } from '../server/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface TweetType {
  id: string;
  createdAt: number;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
}

export default function useLoadTweets() {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const fetchTweet = async () => {
    const tweetsQuery = query(
      collection(database, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map(doc => {
      const { createdAt, photo, tweet, userId, username } = doc.data();
      return {
        id: doc.id,
        createdAt,
        photo,
        tweet,
        userId,
        username,
      };
    });

    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweet();
  }, [tweets]);

  return { tweets };
}
