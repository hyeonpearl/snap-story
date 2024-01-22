import { User } from 'firebase/auth';
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  PersonIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ITweet } from '@/hooks';

interface Props extends ITweet {
  user?: User | null;
}

export function Tweet({
  postedAt,
  photo,
  tweet,
  username,
  userEmail,
  profilePicture,
}: Props) {
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
              {username}{' '}
              <strong className='ml-1 text-gray-500 font-normal'>
                @{userEmail} • {postedAt.month}월 {postedAt.day}일
              </strong>
            </span>
            <div className='text-center cursor-pointer p-1 ml-auto rounded hover:text-primary'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DotsHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Pencil1Icon className='mr-2 h-4 w-4' />
                    <span>Edit Tweet</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TrashIcon className='mr-2 h-4 w-4' />
                    <span>Delete Tweet</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
