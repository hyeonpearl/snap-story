import { Link } from 'react-router-dom';
import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timeline } from '@/components/layout/Timeline';
import { useLoadSnap } from '@/hooks';

export default function Profile() {
  const { user, snaps } = useLoadSnap('userId');

  const USER_NAME = user?.displayName;
  const USER_EMAIL = user?.email?.split('@')[0];
  const USER_PHOTO = user?.photoURL || '';

  return (
    <main className='ml-64 py-4'>
      <header className='mb-4'>
        <Card className='w-full max-w-xl'>
          <CardContent className='pt-6'>
            <div className='flex gap-8'>
              <Avatar className='w-36 h-36'>
                <AvatarImage src={USER_PHOTO} className='w-full h-full' />
                <AvatarFallback>
                  <PersonIcon className='w-3/4 h-3/4' />
                </AvatarFallback>
              </Avatar>
              <section className='w-full'>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <span className='f font-semibold text-lg'>{USER_NAME}</span>
                    <span className='text-gray-500'>@{USER_EMAIL}</span>
                  </div>
                  <Button asChild>
                    <Link to={'/settings'}>Settings</Link>
                  </Button>
                </div>
                <div className='mt-4'>
                  <strong>{snaps.length}</strong> Snaps
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </header>
      <Timeline user={user} snaps={snaps} />
    </main>
  );
}
