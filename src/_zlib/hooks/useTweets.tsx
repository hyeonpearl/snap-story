import { auth, database } from '../server/firebase';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface TweetType {
  id: string;
  createdAt: number;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  userEmail: string;
  picture: string;
}

/**
 * Tweet 정보를 불러오는 함수
 */
export default function useTweets() {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTweet = async () => {
      const tweetsQuery = query(
        collection(database, 'tweets'),
        orderBy('createdAt', 'desc'),
        limit(25)
      );
      unsubscribe = onSnapshot(tweetsQuery, snapshot => {
        const tweets = snapshot.docs.map(doc => {
          const {
            createdAt,
            photo,
            tweet,
            userId,
            username,
            userEmail,
            picture,
          } = doc.data();
          return {
            id: doc.id,
            createdAt,
            photo,
            tweet,
            userId,
            username,
            userEmail,
            picture,
          };
        });
        setTweets(tweets);
      });
    };
    fetchTweet();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return { user, tweets };
}
