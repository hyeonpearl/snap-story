import { Timeline } from '@/components/layout/Timeline';
import { AuthContext } from '@/lib/AuthContext';
import { useLoadSnap } from '@/hooks';
import { useContext } from 'react';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { snaps } = useLoadSnap('all');

  return (
    <main className='ml-64 py-4'>
      <Timeline user={user} snaps={snaps} />
    </main>
  );
}
