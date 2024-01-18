import { auth, db } from '@/server/firebase';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

export interface ITweet {
  id: string;
  createdAt: number;
  postedAt: { month: number; day: number };
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  userEmail: string;
  profilePicture: string;
}

export function useLoadTweet(order: 'all' | 'userId') {
  const user = auth.currentUser;
  const unsubscribeRef = useRef<Unsubscribe | null>(null);
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    async function fetchTweet() {
      const tweetsQuery =
        order === 'userId'
          ? query(
              collection(db, 'tweets'),
              where('userId', '==', user?.uid),
              orderBy('createdAt', 'desc'),
              limit(50)
            )
          : query(
              collection(db, 'tweets'),
              orderBy('createdAt', 'desc'),
              limit(50)
            );

      unsubscribeRef.current = onSnapshot(tweetsQuery, snapshot => {
        const tweets = snapshot.docs.map(doc => {
          const {
            createdAt,
            postedAt,
            photo,
            tweet,
            userId,
            username,
            userEmail,
            profilePicture,
          } = doc.data();
          return {
            id: doc.id,
            createdAt,
            postedAt,
            photo,
            tweet,
            userId,
            username,
            userEmail,
            profilePicture,
          };
        });
        setTweets(tweets);
      });
    }

    fetchTweet();

    return () => {
      unsubscribeRef.current && unsubscribeRef.current();
    };
  }, [order, user]);

  return { user, tweets };
}
