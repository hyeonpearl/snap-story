import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import useAuth from '@/hooks/useAuth';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { usePostTweet } from '@/hooks/Tweet/usePostTweet';

export function PageLayout() {
  const { handleSignOut } = useAuth();
  const { open, setOpen, postTweetForm, onSubmit } = usePostTweet();

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Post</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <div className='flex items-center'>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                <PersonIcon />
              </AvatarFallback>
            </Avatar>
            <div className='indent-5 text-sm'>
              <div>Display Name</div>
              <div className='text-gray-500'>@email</div>
            </div>
          </div>
          <FormProvider {...postTweetForm}>
            <form
              className='flex-2 flex-auto'
              onSubmit={postTweetForm.handleSubmit(onSubmit)}
            >
              <FormField
                control={postTweetForm.control}
                name='tweet'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder='무슨 일이 일어났나요?'
                        className='resize-none h-28'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>
          <DialogFooter>
            <Button
              type='submit'
              onClick={postTweetForm.handleSubmit(onSubmit)}
            >
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Popover>
        <PopoverTrigger asChild>
          <div className='flex justify-between items-center mt-auto p-2 rounded-lg hover:bg-slate-100 cursor-pointer'>
            <div className='flex items-center'>
              <Avatar>
                <AvatarImage src='#' alt='profile' />
                <AvatarFallback>
                  <PersonIcon />
                </AvatarFallback>
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
          <AlertDialog>
            <AlertDialogTrigger asChild className='w-full'>
              <Button variant='destructive' className='w-full'>
                Sign Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  정말로 로그아웃하시겠습니까?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant='destructive' asChild>
                  <AlertDialogAction onClick={handleSignOut}>
                    Sign Out
                  </AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
