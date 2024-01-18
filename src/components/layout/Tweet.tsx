import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DotsHorizontalIcon, PersonIcon } from '@radix-ui/react-icons';

export function Tweet() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                <PersonIcon />
              </AvatarFallback>
            </Avatar>
            <span>Display Name</span>
            <span className='text-sm text-muted-foreground'>@email • date</span>
          </div>
          <div className=' text-center cursor-pointer p-2 rounded hover:text-primary'>
            <DotsHorizontalIcon />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>Tweet Content</p>
      </CardContent>
    </Card>
  );
}
