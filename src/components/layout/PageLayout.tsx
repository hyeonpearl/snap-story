import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  TwitterLogoIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

export function PageLayout() {
  return (
    <nav className='flex flex-col w-1/5 h-full p-3 border-r gap-4'>
      <Button variant='ghost'>
        <img src='/logo-red.svg' alt='logo' className='mr-2 w-5 h-5 ' />
        Cloning X
      </Button>
      <Button variant='ghost'>
        <HomeIcon className='mr-2 w-5 h-5' />
        Home
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
      <Button variant='ghost'>
        <PersonIcon className='mr-2 w-5 h-5' />
        Profile
      </Button>
      <Button>
        <TwitterLogoIcon className='mr-2 w-5 h-5' />
        Post
      </Button>
      <Popover>
        <PopoverTrigger asChild>
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
            <DotsHorizontalIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Button variant='destructive' className='w-full'>
            Sign Out
          </Button>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
