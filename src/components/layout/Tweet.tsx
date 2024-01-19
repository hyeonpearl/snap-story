import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ITweet } from '@/hooks/Tweet/useLoadTweet';
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
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={profilePicture} alt='profile-picture' />
              <AvatarFallback>
                <PersonIcon />
              </AvatarFallback>
            </Avatar>
            <span>{username}</span>
            <span className='text-sm text-muted-foreground'>
              @{userEmail} • {postedAt.month}월 {postedAt.day}일
            </span>
          </div>
          <div className=' text-center cursor-pointer p-2 rounded hover:text-primary'>
            <DotsHorizontalIcon />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{tweet}</p>
        {photo && (
          <AspectRatio ratio={1 / 1} className='border rounded mt-3'>
            <img src={photo} className='w-full h-full rounded' />
          </AspectRatio>
        )}
      </CardContent>
    </Card>
  );
}
