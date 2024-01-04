import { auth, db, storage } from '../server/firebase';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

const validateFileSize = (file: File | null) => {
  if (file && file.size > 1024 * 1024) {
    alert('1MB 미만 크기의 파일만 업로드 가능합니다.');
    return null;
  }
  return file;
};

const formatTweetDate = (date: Date) => ({
  month: date.getMonth() + 1,
  day: date.getDate(),
});

const uploadFileAndReturnURL = async (
  userUid: string,
  tweetId: string,
  file: File
): Promise<string> => {
  const locationRef = ref(storage, `tweets/${userUid}/${tweetId}`);
  const uploaded = await uploadBytes(locationRef, file);
  return getDownloadURL(uploaded.ref);
};

const postTweet = async (
  userUid: string,
  tweet: string,
  file: File | null
): Promise<void> => {
  const date = new Date();
  const tweetData = {
    tweet,
    createdAt: Date.now(),
    postedAt: formatTweetDate(date),
    username: auth.currentUser?.displayName || '익명',
    userId: userUid,
    userEmail: auth.currentUser?.email?.split('@')[0],
    profilePicture: auth.currentUser?.photoURL,
  };

  const docRef = await addDoc(collection(db, 'tweets'), tweetData);

  if (file) {
    const url = await uploadFileAndReturnURL(userUid, docRef.id, file);
    await updateDoc(docRef, { photo: url });
  }
};

export default function usePostTweet() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) setFile(files[0]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || isLoading || tweet === '' || tweet.length > 180) return;

    try {
      setIsLoading(true);
      await postTweet(user.uid, tweet, validateFileSize(file));
      setTweet('');
      setFile(null);
    } catch (error) {
      console.error('트윗을 게시하는 도중 오류가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    tweet,
    file,
    handleTweetChange,
    handleFileChange,
    handleSubmit,
  };
}
