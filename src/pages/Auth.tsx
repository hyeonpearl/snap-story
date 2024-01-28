import { FormProvider } from 'react-hook-form';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { HorizontalRule } from '@/components/layout/HorizontalRule';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/hooks';

export default function SignUp() {
  const {
    signUpForm,
    signInForm,
    handleSignUp,
    handleSignIn,
    handleSignInGithub,
  } = useAuth();

  return (
    <main className='container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='absolute right-4 top-4' variant='ghost'>
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              이메일과 비밀번호를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Button variant='outline' onClick={handleSignInGithub}>
              <GitHubLogoIcon className='mr-2' />
              Sign In the Github
            </Button>
            <HorizontalRule content='OR' />
            <FormProvider {...signInForm}>
              <form
                className='flex flex-col gap-1'
                onSubmit={signInForm.handleSubmit(handleSignIn)}
              >
                <FormField
                  control={signInForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type='email' placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              onClick={signInForm.handleSubmit(handleSignIn)}
              className='w-full'
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className='relative hidden h-full flex-col p-10  bg-primary text-primary-foreground lg:flex dark:border-r'>
        <div className='flex items-center justify-center m-auto'>
          <img className='w-72' src='logo-white.svg' alt='logo' />
        </div>
      </div>

      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              지금 일어나고 있는 일
            </h1>
            <p className='text-muted-foreground text-lg'>지금 가입하세요.</p>
          </div>

          <div className='grid gap-6'>
            <Button variant='outline' onClick={handleSignInGithub}>
              <GitHubLogoIcon className='mr-2' />
              Sign Up the Github
            </Button>
            <HorizontalRule content='OR' />
            <FormProvider {...signUpForm}>
              <form
                className='flex flex-col gap-1'
                onSubmit={signUpForm.handleSubmit(handleSignUp)}
              >
                <FormField
                  control={signUpForm.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Username' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type='email' placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <Button
                type='button'
                onClick={signUpForm.handleSubmit(handleSignUp)}
              >
                Create Account
              </Button>
            </FormProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
