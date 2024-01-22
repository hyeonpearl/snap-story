import { User } from 'firebase/auth';
import {
  DotsHorizontalIcon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DotsHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Pencil1Icon className='mr-2 h-4 w-4' />
                        <span>Edit Tweet</span>
                      </DropdownMenuItem>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem>
                          <TrashIcon className='mr-2 h-4 w-4' />
                          <span>Delete Tweet</span>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
