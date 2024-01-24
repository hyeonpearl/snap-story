import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '@/server/firebase';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { postTweetFormSchema } from '.';
import { zodResolver } from '@hookform/resolvers/zod';

async function editTweet(
  tweetId: string,
  data: z.infer<typeof postTweetFormSchema>
) {
  try {
    const tweetRef = doc(db, 'tweets', tweetId);
    await updateDoc(tweetRef, { tweet: data.tweet });
  } catch (error) {
    console.error(error);
  }
}
async function deleteTweet(
  tweetId: string,
  userId: string,
  hasPhoto: string | undefined
) {
  try {
    const tweetRef = doc(db, 'tweets', tweetId);
    await deleteDoc(tweetRef);

    if (hasPhoto) {
      const photoRef = ref(storage, `tweets/${userId}/${tweetId}`);
      await deleteObject(photoRef);
    }
  } catch (error) {
    console.error(error);
  }
}

export function useTweetManagement() {
  const [open, setOpen] = useState(false);
  const editTweetForm = useForm<z.infer<typeof postTweetFormSchema>>({
    resolver: zodResolver(postTweetFormSchema),
    defaultValues: {
      tweet: '',
      image: new File([], ''),
    },
  });

  async function onEdit(
    tweetId: string,
    data: z.infer<typeof postTweetFormSchema>
  ) {
    try {
      editTweet(tweetId, data);
      setOpen(false);
      editTweetForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return { open, setOpen, editTweetForm, onEdit, deleteTweet };
}
