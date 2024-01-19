import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ITweet } from '@/hooks/useLoadTweet';
import { DotsHorizontalIcon, PersonIcon } from '@radix-ui/react-icons';
import { User } from 'firebase/auth';

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
              <DotsHorizontalIcon />
            </div>
          </div>
          <p className='text-sm'>{tweet}</p>
          {photo && (
            <AspectRatio ratio={1 / 1} className='border rounded mt-3'>
              <img src={photo} className='w-full h-full rounded' />
            </AspectRatio>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
