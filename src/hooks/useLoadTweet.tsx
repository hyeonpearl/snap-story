import { useEffect, useRef, useState } from 'react';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from '@/server/firebase';

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

  async function updateProfilePicture(newPictureUrl: string) {
    const batch = writeBatch(db);

    tweets.forEach(tweet => {
      const tweetRef = doc(db, 'tweets', tweet.id);
      batch.update(tweetRef, { profilePicture: newPictureUrl });
    });

    await batch.commit();
  }

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

  return { user, tweets, updateProfilePicture };
}
