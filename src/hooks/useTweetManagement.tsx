import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { auth, db, storage } from '@/server/firebase';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { postTweetFormSchema, uploadFileAndReturnURL } from '.';
import { zodResolver } from '@hookform/resolvers/zod';

async function editTweet(
  userUid: string,
  tweetId: string,
  data: z.infer<typeof postTweetFormSchema>
) {
  try {
    const tweetRef = doc(db, 'tweets', tweetId);
    await updateDoc(tweetRef, { tweet: data.tweet });

    if (data.image?.name) {
      const url = await uploadFileAndReturnURL(userUid, tweetId, data.image);
      await updateDoc(tweetRef, { photo: url });
    }
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
  const user = auth.currentUser;
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
    if (!user) return;

    try {
      editTweet(user?.uid, tweetId, data);
      setOpen(false);
      editTweetForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return { open, setOpen, editTweetForm, onEdit, deleteTweet };
}
