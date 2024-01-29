import { PersonIcon } from '@radix-ui/react-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Setting() {
  return (
    <main className='ml-64 py-6 max-w-xl grid grid-cols-1 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Settings profile</CardTitle>
          <CardDescription>Set up your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <section>
            <div className='flex flex-col justify-center items-center'>
              <Avatar className='w-28 h-28'>
                <AvatarImage />
                <AvatarFallback>
                  <PersonIcon className='w-3/4 h-3/4' />
                </AvatarFallback>
              </Avatar>
              <Button variant='link' className='mt-4'>
                Change Profile Picture
              </Button>
            </div>
            <div className='flex flex-col justify-center mt-8'>
              <div className='flex justify-between items-center'>
                <span>userName</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='link'>Change Username</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Change Username</DialogTitle>
                    <DialogDescription>
                      Please enter the username.
                    </DialogDescription>
                    <div>
                      <Input type='text' defaultValue='userName' />
                    </div>
                    <DialogFooter>
                      <Button>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <span>userMail</span>
            </div>
          </section>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-red-500'>Delete Account</CardTitle>
          <CardDescription>
            Once you delete your account, there is no going back. Please be
            certain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-red-500'>
                    Delete Account
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    There is no going back. Are you sure you want to delete your
                    account?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant='destructive' asChild>
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
