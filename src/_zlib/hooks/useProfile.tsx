import { auth, storage } from '../server/firebase';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

export default function useProfile() {
  const user = auth.currentUser;

  const initialProfile = {
    username: user?.displayName,
    email: user?.email,
    profilePicture: user?.photoURL,
    creationTime: user?.metadata.creationTime,
  };
  const [profile, setProfile] = useState(initialProfile);

  const handleNameChange = async () => {
    const name = prompt('이름을 입력해주세요.', user?.displayName ?? '익명');

    if (!user) return;

    setProfile(prev => ({
      ...prev,
      username: name,
    }));
    await updateProfile(user, {
      displayName: name,
    });
  };
  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (!user) return;

    if (files && files.length === 1) {
      const file = files[0];

      if (file && file?.size > 1024 * 1024) {
        alert('1MB 미만 크기의 파일만 업로드 가능합니다.');
        return;
      }

      const locationRef = ref(storage, `profile/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const pictureUrl = await getDownloadURL(result.ref);

      setProfile(prev => ({
        ...prev,
        profilePicture: pictureUrl,
      }));
      await updateProfile(user, {
        photoURL: pictureUrl,
      });
    }
  };

  return { user, profile, handleNameChange, handlePictureChange };
}
