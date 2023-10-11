import { auth, database, storage } from '../server/firebase';
import { TweetType } from './useTweets';
import { useState } from 'react';
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
  const creationTime = user?.metadata.creationTime;
  const [picture, setPicture] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const onPictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!user) return;

    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `profile/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const pictureUrl = await getDownloadURL(result.ref);
      setPicture(pictureUrl);
      await updateProfile(user, {
        photoURL: pictureUrl,
      });
    }
  };
  const fetchData = async () => {
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
  };

  return { user, tweets, picture, creationTime, onPictureChange, fetchData };
}
