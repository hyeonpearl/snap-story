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
import { AuthContext } from '@/lib/AuthContext';
import { useContext } from 'react';

export default function Setting() {
  const { user } = useContext(AuthContext);
  const { updateProfileName, updateProfilePicture } = useLoadSnap('userId');
  const {
    nameOpen,
    setNameOpen,
    profileNameForm,
    onChangeName,
    pictureOpen,
    setPictureOpen,
    profilePictureForm,
    onChangePicture,
  } = useSettingProfile(updateProfileName, updateProfilePicture);
  const { onDeleteAccount } = useAuth();

  const USER_NAME = user?.displayName;
  const USER_EMAIL = user?.email;
  const USER_PHOTO = user?.photoURL || '';

  return (
    <main className='ml-64 py-6 max-w-xl grid grid-cols-1 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>계정 설정</CardTitle>
          <CardDescription>계정을 설정하세요.</CardDescription>
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
                    프로필 사진 변경
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
                  사진 변경하기
                </Button>
                <DialogClose asChild>
                  <Button variant='outline'>취소</Button>
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
                    <Button variant='link'>사용자 이름 변경</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>사용자 이름 변경</DialogTitle>
                    <DialogDescription>
                      사용자 이름을 변경합니다.
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
                        이름 변경하기
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
          <CardTitle className='text-red-500'>계정 삭제</CardTitle>
          <CardDescription>
            계정을 삭제하면 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>계정 삭제</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-red-500'>
                    계정 삭제
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    계정을 삭제하면 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <Button variant='destructive' asChild>
                    <AlertDialogAction onClick={onDeleteAccount}>
                      계정 삭제하기
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
