import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  ProfileFormNameSchema,
  ProfileFormPictureSchema,
  ProfileNameType,
  ProfilePictureType,
} from '@/lib/schema';
import { auth, storage } from '@/server/firebase';

type UpdateProfilePictureFn = (newPictureUrl: string) => Promise<void>;

async function uploadProfilePicture(user: User, file: File) {
  const locationRef = ref(storage, `profile/${user?.uid}`);
  const result = await uploadBytes(locationRef, file);
  return getDownloadURL(result.ref);
}

export function useSettingProfile(
  updateProfilePicture: UpdateProfilePictureFn
) {
  const user = auth.currentUser;
  const [nameOpen, setNameOpen] = useState(false);
  const [pictureOpen, setPictureOpen] = useState(false);
  const profileNameForm = useForm<ProfileNameType>({
    resolver: zodResolver(ProfileFormNameSchema),
    defaultValues: { username: '' },
  });
  const profilePictureForm = useForm<ProfilePictureType>({
    resolver: zodResolver(ProfileFormPictureSchema),
    defaultValues: { image: new File([], '') },
  });

  async function onChangeName(data: ProfileNameType) {
    if (!user) return;

    try {
      await updateProfile(user, { displayName: data.username });
      setNameOpen(false);
      profileNameForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function onChangePicture(data: ProfilePictureType) {
    if (!user) return;

    try {
      const pictureUrl = await uploadProfilePicture(user, data.image);
      await updateProfile(user, {
        photoURL: pictureUrl,
      });
      updateProfilePicture(pictureUrl);
      setPictureOpen(false);
      profilePictureForm.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    user,
    nameOpen,
    setNameOpen,
    profileNameForm,
    onChangeName,
    pictureOpen,
    setPictureOpen,
    profilePictureForm,
    onChangePicture,
  };
}
