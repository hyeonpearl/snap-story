import { auth, db, storage } from '../server/firebase';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

/**
 * 입력 받은 Tweet을 게시하는 함수
 */
export default function usePostTweet() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file && file?.size > 1024 * 1024) {
      alert('1MB 미만 크기의 파일만 업로드 가능합니다.');
      setFile(null);
    }
  }, [file]);

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
    const date = new Date();

    if (!user || isLoading || tweet === '' || tweet.length > 180) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        postedAt: { month: date.getMonth() + 1, day: date.getDate() },
        username: user.displayName || '익명',
        userId: user.uid,
        userEmail: user.email,
        profilePicture: user.photoURL,
      });

      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const uploaded = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(uploaded.ref);

        await updateDoc(doc, { photo: url });
      }

      setTweet('');
      setFile(null);
    } catch (error) {
      console.log(error);
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
