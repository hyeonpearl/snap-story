import { auth, db } from '../server/firebase';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface TweetType {
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

/**
 * Tweet 정보를 불러오는 함수
 */
export default function useTweets(order: 'all' | 'userId') {
  const user = auth.currentUser;
  let unsubscribe: Unsubscribe | null = null;

  const [tweets, setTweets] = useState<TweetType[]>([]);

  // const locationRef = ref(storage, `profile/${user?.uid}`);
  // const uploadedProfile = getMetadata(locationRef).then(meta => meta.updated);

  const fetchTweet = async () => {
    const tweetsQuery =
      order === 'userId'
        ? query(
            collection(db, 'tweets'),
            where('userId', '==', user?.uid),
            orderBy('createdAt', 'desc'),
            limit(25)
          )
        : query(
            collection(db, 'tweets'),
            orderBy('createdAt', 'desc'),
            limit(25)
          );

    unsubscribe = onSnapshot(tweetsQuery, snapshot => {
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
  };

  useEffect(() => {
    fetchTweet();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return { user, tweets };
}
