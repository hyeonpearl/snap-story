import { auth, db } from '../server/firebase';
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
import { useEffect, useRef, useState } from 'react';

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
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
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
    };

    fetchTweet();

    return () => {
      unsubscribeRef.current && unsubscribeRef.current();
    };
  }, [order, user]);

  const updateProfilePicture = async (newPictureUrl: string) => {
    // 트윗의 프로필 사진 업데이트 로직을 작성
    const batch = writeBatch(db);

    tweets.forEach(tweet => {
      const tweetRef = doc(db, 'tweets', tweet.id);
      batch.update(tweetRef, { profilePicture: newPictureUrl });
    });

    await batch.commit();
  };

  return { user, tweets, updateProfilePicture };
}
