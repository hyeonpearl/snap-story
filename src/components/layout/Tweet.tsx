import { User } from 'firebase/auth';
import {
  DotsHorizontalIcon,
  ImageIcon,
  Pencil1Icon,
  PersonIcon,
  TrashIcon,
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
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ITweet, useTweetManagement } from '@/hooks';

interface Props extends ITweet {
  user?: User | null;
}

export function Tweet({
  id,
  postedAt,
  photo,
  tweet,
  user,
  userId,
  username,
  userEmail,
  profilePicture,
}: Props) {
  const { deleteTweet } = useTweetManagement();

  return (
    <Card>
      <CardContent className='flex pt-6'>
        <Avatar className='mr-2'>
          <AvatarImage src={profilePicture} alt='profile-picture' />
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
        <div className='w-full'>
          <div className='flex items-start'>
            <span>
              {username}
              <strong className='ml-1 text-gray-500 font-normal'>
                @{userEmail} • {postedAt.month}월 {postedAt.day}일
              </strong>
            </span>
            {user?.uid === userId && (
              <div className='text-center cursor-pointer p-1 ml-auto rounded hover:text-primary'>
                <AlertDialog>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DotsHorizontalIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DialogTrigger asChild>
                          <DropdownMenuItem>
                            <Pencil1Icon className='mr-2 h-4 w-4' />
                            <span>Edit Tweet</span>
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem>
                            <TrashIcon className='mr-2 h-4 w-4' />
                            <span>Delete Tweet</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className='sm:max-w-[425px]'>
                      <div className='flex items-center'>
                        <Avatar>
                          <AvatarImage alt='profile-picture' />
                          <AvatarFallback>
                            <PersonIcon />
                          </AvatarFallback>
                        </Avatar>
                        <div className='indent-5 text-sm'>
                          <div>USER_NAME</div>
                          <div className='text-gray-500'>@USER_EMAIL</div>
                        </div>
                      </div>

                      <form className='flex-2 flex-auto'>
                        <Textarea
                          placeholder='무슨 일이 일어났나요?'
                          className='resize-none h-28'
                        />

                        <div className='flex flex-col-reverse items-center sm:flex-row sm:justify-between sm:space-x-2 pt-4'>
                          <div>
                            <Label
                              htmlFor='picture'
                              className='mr-auto cursor-pointer text-gray-500 hover:text-primary'
                            >
                              <ImageIcon className='w-8 h-full' />
                            </Label>
                            <Input
                              id='picture'
                              type='file'
                              accept='image/*'
                              className='hidden'
                            />
                          </div>
                          <Button type='submit'>Post</Button>
                        </div>
                      </form>
                    </DialogContent>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          정말로 삭제하시겠습니까?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button variant='destructive' asChild>
                          <AlertDialogAction
                            onClick={() => deleteTweet(id, userId, photo)}
                          >
                            Delete
                          </AlertDialogAction>
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </Dialog>
                </AlertDialog>
              </div>
            )}
          </div>
          <p className='text-sm'>{tweet}</p>
          {photo && (
            <AspectRatio ratio={1 / 1} className='border rounded mt-3'>
              <img
                src={photo}
                className='w-full h-full rounded'
                alt='tweet-photo'
              />
            </AspectRatio>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
