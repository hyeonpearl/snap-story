import { Timeline } from '@/components/layout/Timeline';
import { useLoadSnap } from '@/hooks';

export default function Home() {
  const { user, snaps } = useLoadSnap('all');

  return (
    <main className='ml-64 py-4'>
      <Timeline user={user} snaps={snaps} />
    </main>
  );
}
