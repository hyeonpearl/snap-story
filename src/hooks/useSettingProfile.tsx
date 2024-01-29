import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from 'firebase/auth';
import { user, ProfileFormNameSchema, ProfileNameType } from '@/lib/schema';

export function useSettingProfile() {
  const [open, setOpen] = useState(false);
  const profileNameForm = useForm<ProfileNameType>({
    resolver: zodResolver(ProfileFormNameSchema),
    defaultValues: { username: '' },
  });

  async function onChangeName(data: ProfileNameType) {
    if (!user) return;

    try {
      await updateProfile(user, { displayName: data.username });
      setOpen(false);
      profileNameForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return { user, open, setOpen, profileNameForm, onChangeName };
}
