import { FormProvider } from 'react-hook-form';
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
  DialogClose,
  DialogContent,
  DialogContentNoneX,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useLoadSnap, useSettingProfile } from '@/hooks';

export default function Setting() {
  const { updateProfilePicture } = useLoadSnap('userId');
  const {
    user,
    nameOpen,
    setNameOpen,
    profileNameForm,
    onChangeName,
    pictureOpen,
    setPictureOpen,
    profilePictureForm,
    onChangePicture,
  } = useSettingProfile(updateProfilePicture);
  const { onDeleteAccount } = useAuth();

  const USER_NAME = user?.displayName;
  const USER_EMAIL = user?.email;
  const USER_PHOTO = user?.photoURL || '';

  return (
    <main className='ml-64 py-6 max-w-xl grid grid-cols-1 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Settings profile</CardTitle>
          <CardDescription>Set up your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <section>
            <Dialog open={pictureOpen} onOpenChange={setPictureOpen}>
              <div className='flex flex-col justify-center items-center'>
                <DialogTrigger asChild>
                  <Avatar className='w-28 h-28 cursor-pointer'>
                    <AvatarImage src={USER_PHOTO} />
                    <AvatarFallback>
                      <PersonIcon className='w-3/4 h-3/4' />
                    </AvatarFallback>
                  </Avatar>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button variant='link' className='mt-4'>
                    Change Profile Picture
                  </Button>
                </DialogTrigger>
              </div>
              <DialogContentNoneX>
                <FormProvider {...profilePictureForm}>
                  <form
                    onSubmit={profilePictureForm.handleSubmit(onChangePicture)}
                  >
                    <FormField
                      control={profilePictureForm.control}
                      name='image'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id='picture'
                              type='file'
                              accept='image/*'
                              onChange={e =>
                                field.onChange(
                                  e.target.files ? e.target.files[0] : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </FormProvider>
                <Button
                  onClick={profilePictureForm.handleSubmit(onChangePicture)}
                >
                  Change Profile Picture
                </Button>
                <DialogClose asChild>
                  <Button variant='outline'>Close</Button>
                </DialogClose>
              </DialogContentNoneX>
            </Dialog>
            <div className='flex flex-col justify-center mt-8'>
              <div className='flex justify-between items-center'>
                <div>
                  <Label>Username :</Label>
                  <span className='ml-1 font-semibold'>{USER_NAME}</span>
                </div>
                <Dialog open={nameOpen} onOpenChange={setNameOpen}>
                  <DialogTrigger asChild>
                    <Button variant='link'>Change Username</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Change Username</DialogTitle>
                    <DialogDescription>
                      Enter the username you want.
                    </DialogDescription>
                    <FormProvider {...profileNameForm}>
                      <form
                        onSubmit={profileNameForm.handleSubmit(onChangeName)}
                      >
                        <FormField
                          control={profileNameForm.control}
                          name='username'
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type='text' {...field} />
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
                        onClick={profileNameForm.handleSubmit(onChangeName)}
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Label>Email :</Label>
                <span className='ml-1 text-gray-500'>{USER_EMAIL}</span>
              </div>
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
                    <AlertDialogAction onClick={onDeleteAccount}>
                      Delete
                    </AlertDialogAction>
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
