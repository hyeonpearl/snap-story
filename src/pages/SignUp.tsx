import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignUp() {
  return (
    <main className='container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Button className='absolute right-4 top-4' variant='ghost'>
        Login
      </Button>

      <div className='relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r bg-slate-950 '>
        <div className='flex items-center justify-center m-auto'>
          <img className='w-72' src='logo-blue.svg' alt='logo' />
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
            <form>
              <div className='grid gap-1'>
                <Input type='text' placeholder='Username' />
                <Input type='email' placeholder='Email' />
                <Input type='password' placeholder='Password' minLength={6} />
              </div>
            </form>
            <Button>Create Account</Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  OR
                </span>
              </div>
            </div>
            <Button variant='outline'>Github</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
