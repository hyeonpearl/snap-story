import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { uploadFileAndReturnURL } from '.';
import { SnapType, SnapFormSchema } from '@/lib/schema';
import { auth, db, storage } from '@/server/firebase';

async function editSnap(userUid: string, snapId: string, data: SnapType) {
  try {
    const snapRef = doc(db, 'snaps', snapId);
    await updateDoc(snapRef, { snap: data.snap });

    if (data.image?.name) {
      const url = await uploadFileAndReturnURL(userUid, snapId, data.image);
      await updateDoc(snapRef, { photo: url });
    }
  } catch (error) {
    console.error(error);
  }
}
async function deleteSnap(
  snapId: string,
  userId: string,
  hasPhoto: string | undefined
) {
  try {
    const snapRef = doc(db, 'snaps', snapId);
    await deleteDoc(snapRef);

    if (hasPhoto) {
      const photoRef = ref(storage, `snaps/${userId}/${snapId}`);
      await deleteObject(photoRef);
    }
  } catch (error) {
    console.error(error);
  }
}

export function useManageSnap({ snap }: { snap: string }) {
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const editSnapForm = useForm<SnapType>({
    resolver: zodResolver(SnapFormSchema),
    defaultValues: {
      snap,
      image: new File([], ''),
    },
  });
  const file = editSnapForm.watch('image');

  async function onEdit(snapId: string, data: SnapType) {
    if (!user) return;

    try {
      editSnap(user?.uid, snapId, data);
      setOpen(false);
      editSnapForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return { open, setOpen, editSnapForm, file, onEdit, deleteSnap };
}
