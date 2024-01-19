import { Timeline } from '@/components/layout/Timeline';
import { useLoadTweet } from '@/hooks/Tweet/useLoadTweet';

export default function Home() {
  const { user, tweets } = useLoadTweet('all');

  return (
    <main className='ml-64 py-4'>
      <Timeline user={user} tweets={tweets} />
    </main>
  );
}
