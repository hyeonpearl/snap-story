import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

export function PageLayout() {
  return (
    <nav className='flex flex-col w-1/5 h-full p-3 border-r gap-4 max-w-60'>
      <div className='flex items-center justify-center'>
        <img
          src='/logo.svg'
          alt='logo'
          className='w-20 h-20 hover:bg-accent p-1 rounded-lg cursor-pointer'
        />
      </div>
      <Button variant='ghost' asChild>
        <Link to='/home'>
          <HomeIcon className='mr-2 w-5 h-5' />
          Home
        </Link>
      </Button>
      <Button variant='ghost'>
        <MagnifyingGlassIcon className='mr-2 w-5 h-5' />
        Explore
      </Button>
      <Button variant='ghost'>
        <BellIcon className='mr-2 w-5 h-5' />
        Notification
      </Button>
      <Button variant='ghost'>
        <EnvelopeClosedIcon className='mr-2 w-5 h-5' />
        Messages
      </Button>
      <Button variant='ghost' asChild>
        <Link to='/profile'>
          <PersonIcon className='mr-2 w-5 h-5' />
          Profile
        </Link>
      </Button>
      <Button>Post</Button>

      <Popover>
        <PopoverTrigger asChild>
          <div className='flex justify-between items-center mt-auto p-2 rounded-lg hover:bg-slate-100 cursor-pointer'>
            <div className='flex items-center'>
              <Avatar>
                <AvatarImage src='/logo.svg' alt='profile' />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              <div className='indent-5 text-sm'>
                <div>Display Name</div>
                <div className='text-gray-500'>@email</div>
              </div>
            </div>
            <DotsHorizontalIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className='max-w-60'>
          <Button variant='destructive' className='w-full'>
            Sign Out
          </Button>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
