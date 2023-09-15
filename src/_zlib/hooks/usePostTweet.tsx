import { auth, database, storage } from '../server/firebase';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

export default function usePostTweet() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) setFile(files[0]);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || isLoading || tweet === '' || tweet.length > 180) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(database, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || '익명',
        userId: user.uid,
      });

      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}_${user.displayName}/${doc.id}`
        );
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

  return { isLoading, tweet, file, onChange, onFileChange, onSubmit };
}
