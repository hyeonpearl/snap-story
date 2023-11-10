import { auth, db, storage } from '../server/firebase';
import { TweetType } from './useTweets';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Unsubscribe, updateProfile } from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

export default function useProfile() {
  const user = auth.currentUser;
  let unsubscribe: Unsubscribe | null = null;

  const initialProfile = {
    username: user?.displayName,
    email: user?.email,
    picture: user?.photoURL,
    creationTime: user?.metadata.creationTime,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const handleNameChange = async () => {
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
  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (!user) return;

    if (files && files.length === 1) {
      const file = files[0];

      if (file && file?.size > 1024 * 1024) {
        alert('1MB 미만 크기의 파일만 업로드 가능합니다.');
        return;
      }

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
  const fetchTweet = async () => {
    const tweetQuery = query(
      collection(db, 'tweets'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25)
    );
    unsubscribe = onSnapshot(tweetQuery, snapshot => {
      const tweets = snapshot.docs.map(doc => {
        const {
          createdAt,
          tweet,
          userId,
          username,
          photo,
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
  }, [user?.uid]);

  return { user, tweets, profile, handleNameChange, handlePictureChange };
}
