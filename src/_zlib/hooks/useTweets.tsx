import { auth, db } from '../server/firebase';
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
  const user = auth.currentUser;
  let unsubscribe: Unsubscribe | null = null;

  const [tweets, setTweets] = useState<TweetType[]>([]);

  const fetchTweet = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
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

  useEffect(() => {
    fetchTweet();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return { user, tweets };
}
