import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { auth, db } from '@/server/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

export const postTweetFormSchema = z.object({
  tweet: z
    .string()
    .min(5, {
      message: '5자 이상 작성해주세요.',
    })
    .max(100, {
      message: '100자 이하로 작성해주세요.',
    }),
});

function formatTweetDate(date: Date) {
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

async function postTweet(
  userUid: string,
  data: z.infer<typeof postTweetFormSchema>
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

  await addDoc(collection(db, 'tweets'), tweetData);
}

export function usePostTweet() {
  const [open, setOpen] = useState(false);
  const postTweetForm = useForm<z.infer<typeof postTweetFormSchema>>({
    resolver: zodResolver(postTweetFormSchema),
  });

  async function onSubmit(data: z.infer<typeof postTweetFormSchema>) {
    const user = auth.currentUser;
    if (!user) return;

    try {
      postTweet(user.uid, data);
      setOpen(false);
      postTweetForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return { open, setOpen, postTweetForm, onSubmit };
}
