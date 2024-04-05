import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { SnapFormSchema, SnapType } from '@/lib/schema';
import { auth, db, storage } from '@/server/firebase';
import { AuthContext } from '@/lib/AuthContext';

function formatSnapDate(date: Date) {
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}
async function uploadFileAndReturnURL(
  userUid: string,
  snapId: string,
  file: File
): Promise<string> {
  const locationRef = ref(storage, `snaps/${userUid}/${snapId}`);
  const uploaded = await uploadBytes(locationRef, file);
  return getDownloadURL(uploaded.ref);
}
async function postSnap(userUid: string, data: SnapType) {
  const date = new Date();
  const snapData = {
    snap: data.snap,
    createdAt: Date.now(),
    postedAt: formatSnapDate(date),
    username: auth.currentUser?.displayName || '익명',
    userId: userUid,
    userEmail: auth.currentUser?.email?.split('@')[0],
    profilePicture: auth.currentUser?.photoURL,
  };

  const docRef = await addDoc(collection(db, 'snaps'), snapData);

  if (data.image?.name) {
    const url = await uploadFileAndReturnURL(userUid, docRef.id, data.image);
    await updateDoc(docRef, { photo: url });
  }
}

function usePostSnap() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const postSnapForm = useForm<SnapType>({
    resolver: zodResolver(SnapFormSchema),
    defaultValues: {
      snap: '',
      image: new File([], ''),
    },
  });
  const file = postSnapForm.watch('image');

  async function onPost(data: SnapType) {
    if (!user) return;

    try {
      postSnap(user.uid, data);
      setOpen(false);
      postSnapForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return { open, setOpen, postSnapForm, file, onPost };
}

export { uploadFileAndReturnURL, usePostSnap };
