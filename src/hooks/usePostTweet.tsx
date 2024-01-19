import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '@/server/firebase';

const FILE_SIZE = 1024 * 1024;

export const postTweetFormSchema = z.object({
  tweet: z
    .string({ required_error: '포스트를 작성해주세요.' })
    .min(5, {
      message: '5자 이상 작성해주세요.',
    })
    .max(100, {
      message: '100자 이하로 작성해주세요.',
    }),
  image: z
    .instanceof(File)
    .refine(file => validateFileSize(file), {
      message: '1MB 미만 크기의 파일만 업로드 가능합니다.',
    })
    .optional(),
});

function validateFileSize(file: File | null) {
  if (file && file.size > FILE_SIZE) {
    return undefined;
  }
  return file;
}
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

  const docRef = await addDoc(collection(db, 'tweets'), tweetData);

  if (data.image) {
    const url = await uploadFileAndReturnURL(userUid, docRef.id, data.image);
    await updateDoc(docRef, { photo: url });
  }
}

export function usePostTweet() {
  const [open, setOpen] = useState(false);
  const postTweetForm = useForm<z.infer<typeof postTweetFormSchema>>({
    resolver: zodResolver(postTweetFormSchema),
    defaultValues: {
      tweet: '',
      image: new File([], ''),
    },
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
