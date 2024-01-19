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
      </CardContent>
    </Card>
  );
}
