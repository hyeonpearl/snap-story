import { FormProvider } from 'react-hook-form';
import { User } from 'firebase/auth';
import {
  CheckboxIcon,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ISnap, useManageSnap } from '@/hooks';
import { FILE_SIZE } from '@/lib/schema';

interface Props extends ISnap {
  user?: User | null;
}

export function Snap({
  id,
  postedAt,
  photo,
  snap,
  user,
  userId,
  username,
  userEmail,
  profilePicture,
}: Props) {
  const { open, setOpen, editSnapForm, file, onEdit, deleteSnap } =
    useManageSnap({ snap });

  return (
    <Card>
      <CardContent className='flex pt-6'>
        <div className='w-full'>
          <div className='flex items-center'>
            <Avatar className='mr-2'>
              <AvatarImage src={profilePicture} alt='profile-picture' />
              <AvatarFallback>
                <PersonIcon className='w-3/4 h-3/4' />
              </AvatarFallback>
            </Avatar>
            <span>
              {username}
              <strong className='ml-1 text-gray-500 font-normal'>
                @{userEmail} • {postedAt.month}월 {postedAt.day}일
              </strong>
            </span>
            {user?.uid === userId && (
              <div className='text-center cursor-pointer p-1 ml-auto rounded hover:text-primary'>
                <AlertDialog>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DotsHorizontalIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DialogTrigger asChild>
                          <DropdownMenuItem>
                            <Pencil1Icon className='mr-2 h-4 w-4' />
                            <span>Edit Snap</span>
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem>
                            <TrashIcon className='mr-2 h-4 w-4' />
                            <span>Delete Snap</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                      </DialogHeader>
                      <div className='flex items-center mt-4'>
                        <Avatar>
                          <AvatarImage
                            src={profilePicture}
                            alt='profile-picture'
                          />
                          <AvatarFallback>
                            <PersonIcon />
                          </AvatarFallback>
                        </Avatar>
                        <div className='indent-5 text-sm'>
                          <div>{username}</div>
                          <div className='text-gray-500'>@{userEmail}</div>
                        </div>
                      </div>
                      <FormProvider {...editSnapForm}>
                        <form
                          className='flex-2 flex-auto'
                          onSubmit={editSnapForm.handleSubmit(data =>
                            onEdit(id, data)
                          )}
                        >
                          <FormField
                            control={editSnapForm.control}
                            name='snap'
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder='무슨 일이 일어났나요?'
                                    className='resize-none h-28 mb-4'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className='flex flex-col-reverse items-center sm:flex-row sm:justify-between sm:space-x-2 pt-4'>
                            <FormField
                              control={editSnapForm.control}
                              name='image'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div>
                                      <Label
                                        htmlFor='picture'
                                        className='mr-auto cursor-pointer text-gray-500 hover:text-primary'
                                      >
                                        {file &&
                                        file.name &&
                                        file.size < FILE_SIZE ? (
                                          <>
                                            <CheckboxIcon className='w-8 h-full text-primary' />
                                          </>
                                        ) : (
                                          <ImageIcon className='w-8 h-full' />
                                        )}
                                      </Label>
                                      <Input
                                        id='picture'
                                        type='file'
                                        accept='image/*'
                                        className='hidden'
                                        onChange={e =>
                                          field.onChange(
                                            e.target.files
                                              ? e.target.files[0]
                                              : undefined
                                          )
                                        }
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type='submit'
                              onSubmit={editSnapForm.handleSubmit(data =>
                                onEdit(id, data)
                              )}
                            >
                              Edit
                            </Button>
                          </div>
                        </form>
                      </FormProvider>
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
                            onClick={() => deleteSnap(id, userId, photo)}
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
          {photo && (
            <AspectRatio ratio={1 / 1} className='border rounded mt-3'>
              <img
                src={photo}
                className='w-full h-full rounded'
                alt='snap-photo'
              />
            </AspectRatio>
          )}
          <p className='text-sm mt-4 whitespace-pre-wrap'>{snap}</p>
        </div>
      </CardContent>
    </Card>
  );
}
