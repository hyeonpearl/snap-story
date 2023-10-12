import { auth, database, storage } from '../server/firebase';
import { TweetType } from './useTweets';
import { useCallback, useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

export default function useProfile() {
  const user = auth.currentUser;
  const initialProfile = {
    username: user?.displayName,
    email: user?.email,
    picture: user?.photoURL,
    creationTime: user?.metadata.creationTime,
  };
  const [profile, setProfile] = useState(initialProfile);
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const onNameChange = async () => {
    const name = prompt('이름을 입력해주세요.', user?.displayName ?? '익명');

    if (!user) return;

    setProfile(prev => ({
      ...prev,
      username: name,
    }));
    await updateProfile(user, {
      displayName: name,
    });
  };
  const onPictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!user) return;

    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `profile/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const pictureUrl = await getDownloadURL(result.ref);
      setProfile(prev => ({
        ...prev,
        picture: pictureUrl,
      }));
      await updateProfile(user, {
        photoURL: pictureUrl,
      });
    }
  };
  const fetchTweet = useCallback(async () => {
    const tweetQuery = query(
      collection(database, 'tweets'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map(doc => {
      const { createdAt, tweet, userId, username, photo } = doc.data();
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
  }, [user]);

  useEffect(() => {
    fetchTweet();
  }, [fetchTweet]);

  return { user, tweets, profile, onNameChange, onPictureChange };
}
