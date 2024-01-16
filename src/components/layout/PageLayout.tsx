import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function PageLayout() {
  return (
    <nav className='flex flex-col w-1/5 h-full p-3 border-r gap-4'>
      <Button variant='ghost'>Home</Button>
      <Button variant='ghost'>Explore</Button>
      <Button variant='ghost'>Notification</Button>
      <Button variant='ghost'>Messages</Button>
      <Button variant='ghost'>Profile</Button>
      <Button>Post</Button>
      <div className='flex justify-between items-center mt-auto p-2 rounded-lg hover:bg-slate-100'>
        <div className='flex items-center'>
          <Avatar>
            <AvatarImage src='/logo-red.svg' alt='profile' />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className='indent-5 text-sm'>
            <div>Display Name</div>
            <div className='text-gray-500'>@email</div>
          </div>
        </div>
        <div>...</div>
      </div>
    </nav>
  );
}
