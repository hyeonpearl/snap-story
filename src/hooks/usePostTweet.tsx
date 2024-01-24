import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { TweetFormSchema } from '@/lib/schema';
import { auth, db, storage } from '@/server/firebase';

function formatTweetDate(date: Date) {
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}
async function uploadFileAndReturnURL(
  userUid: string,
  tweetId: string,
  file: File
): Promise<string> {
  const locationRef = ref(storage, `tweets/${userUid}/${tweetId}`);
  const uploaded = await uploadBytes(locationRef, file);
  return getDownloadURL(uploaded.ref);
}
async function postTweet(
  userUid: string,
  data: z.infer<typeof TweetFormSchema>
) {
  const date = new Date();
  const tweetData = {
    tweet: data.tweet,
    createdAt: Date.now(),
    postedAt: formatTweetDate(date),
    username: auth.currentUser?.displayName || '익명',
    userId: userUid,
    userEmail: auth.currentUser?.email?.split('@')[0],
    profilePicture: auth.currentUser?.photoURL,
  };

  const docRef = await addDoc(collection(db, 'tweets'), tweetData);

  if (data.image?.name) {
    const url = await uploadFileAndReturnURL(userUid, docRef.id, data.image);
    await updateDoc(docRef, { photo: url });
  }
}

function usePostTweet() {
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const postTweetForm = useForm<z.infer<typeof TweetFormSchema>>({
    resolver: zodResolver(TweetFormSchema),
    defaultValues: {
      tweet: '',
      image: new File([], ''),
    },
  });
  const file = postTweetForm.watch('image');

  async function onPost(data: z.infer<typeof TweetFormSchema>) {
    if (!user) return;

    try {
      postTweet(user.uid, data);
      setOpen(false);
      postTweetForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return { open, setOpen, postTweetForm, file, onPost };
}

export { uploadFileAndReturnURL, usePostTweet };
