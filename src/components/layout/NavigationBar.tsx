import { Link } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  ImageIcon,
  CheckboxIcon,
} from '@radix-ui/react-icons';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, usePostSnap } from '@/hooks';
import { FILE_SIZE } from '@/lib/schema';

export function NavigationBar() {
  const { user, handleSignOut } = useAuth();
  const { open, setOpen, postSnapForm, file, onPost } = usePostSnap();

  const USER_NAME = user?.displayName || '익명';
  const USER_EMAIL = user?.email?.split('@')[0];
  const USER_PHOTO = user?.photoURL || '';

  return (
    <nav className='fixed w-60 h-full max-w-60 flex flex-col p-3 border-r gap-4 bg-white'>
      <div className='flex items-center justify-center'>
        <img
          src='/snap-story.png'
          alt='logo'
          className='hover:bg-accent p-1 rounded-lg cursor-pointer'
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
          <DialogHeader>
            <DialogTitle>Post</DialogTitle>
          </DialogHeader>
          <div className='flex items-center mt-4'>
            <Avatar>
              <AvatarImage src={USER_PHOTO} alt='profile-picture' />
              <AvatarFallback>
                <PersonIcon />
              </AvatarFallback>
            </Avatar>
            <div className='indent-5 text-sm'>
              <div>{USER_NAME}</div>
              <div className='text-gray-500'>@{USER_EMAIL}</div>
            </div>
          </div>
          <FormProvider {...postSnapForm}>
            <form
              className='flex-2 flex-auto'
              onSubmit={postSnapForm.handleSubmit(onPost)}
            >
              <FormField
                control={postSnapForm.control}
                name='snap'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder='무슨 일이 일어났나요?'
                        className='resize-none h-28 mb-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col-reverse items-center sm:flex-row sm:justify-between sm:space-x-2 pt-4'>
                <FormField
                  control={postSnapForm.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <Label
                            htmlFor='picture'
                            className='mr-auto cursor-pointer text-gray-500 hover:text-primary'
                          >
                            {file && file.name && file.size < FILE_SIZE ? (
                              <>
                                <CheckboxIcon className='w-8 h-full text-primary' />
                              </>
                            ) : (
                              <ImageIcon className='w-8 h-full' />
                            )}
                          </Label>
                          <Input
                            id='picture'
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={e =>
                              field.onChange(
                                e.target.files ? e.target.files[0] : undefined
                              )
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  onClick={postSnapForm.handleSubmit(onPost)}
                >
                  Post
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <Popover>
        <PopoverTrigger asChild>
          <div className='flex items-center mt-auto p-2 rounded-lg hover:bg-slate-100 cursor-pointer'>
            <div className='flex items-center'>
              <Avatar>
                <AvatarImage src={USER_PHOTO} alt='profile-picture' />
                <AvatarFallback>
                  <PersonIcon />
                </AvatarFallback>
              </Avatar>
              <div className='indent-5 text-sm'>
                <div>{USER_NAME}</div>
                <div className='text-gray-500'>@{USER_EMAIL}</div>
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className='max-w-60'>
          <Button variant='outline' className='w-full mb-1' asChild>
            <Link to='/setting'>Setting</Link>
          </Button>
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
