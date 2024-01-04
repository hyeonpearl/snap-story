import { auth, storage } from '../server/firebase';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User, updateProfile } from 'firebase/auth';

type UpdateProfilePictureFn = (newPictureUrl: string) => Promise<void>;

const MAX_FILE_SIZE = 1024 * 1024;

function formattedDate(date: Date | null) {
  return date?.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function uploadProfilePicture(user: User, file: File) {
  const locationRef = ref(storage, `profile/${user?.uid}`);
  const result = await uploadBytes(locationRef, file);
  return getDownloadURL(result.ref);
}

export default function useProfile(
  updateProfilePicture: UpdateProfilePictureFn
) {
  const user = auth.currentUser;
  const accountDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime)
    : null;

  const [profile, setProfile] = useState({
    username: user?.displayName,
    email: user?.email,
    profilePicture: user?.photoURL,
    creationTime: formattedDate(accountDate),
  });

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

      if (file && file?.size > MAX_FILE_SIZE) {
        alert('1MB 미만 크기의 파일만 업로드 가능합니다.');
        return;
      }

      try {
        const pictureUrl = await uploadProfilePicture(user, file);

        setProfile(prev => ({
          ...prev,
          profilePicture: pictureUrl,
        }));
        await updateProfile(user, {
          photoURL: pictureUrl,
        });

        updateProfilePicture(pictureUrl);
      } catch (error) {
        console.error('프로필 업로드 에러 발생!', error);
      }
    }
  };

  return { user, profile, handleNameChange, handlePictureChange };
}
