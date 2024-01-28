import { User } from 'firebase/auth';
import { Snap } from './Snap';
import { ISnap } from '@/hooks';

export function Timeline({
  user,
  snaps,
}: {
  user: User | null;
  snaps: ISnap[];
}) {
  return (
    <div className='w-full max-w-xl grid grid-cols-1 gap-4'>
      {snaps.map(snap => (
        <Snap key={snap.id} user={user} {...snap} />
      ))}
    </div>
  );
}
