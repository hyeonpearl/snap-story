import { auth } from '@/server/firebase';
import {
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const signUpFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: '최소 2자 이상 입력해주세요.',
    })
    .max(10, {
      message: '최대 10자 이하 입력해주세요.',
    }),
  email: z
    .string()
    .min(1, {
      message: '이메일을 입력해주세요.',
    })
    .email({ message: '이메일 양식을 지켜주세요.' }),
  password: z
    .string()
    .min(6, {
      message: '최소 6자 이상 입력해주세요.',
    })
    .max(16, {
      message: '최대 16자 이하 입력해주세요.',
    }),
});

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: '이메일을 입력해주세요.',
    })
    .email({ message: '이메일 양식을 지켜주세요.' }),
  password: z
    .string()
    .min(6, {
      message: '최소 6자 이상 입력해주세요.',
    })
    .max(16, {
      message: '최대 16자 이하 입력해주세요.',
    }),
});

export default function useSign() {
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  async function handleSignUp(data: z.infer<typeof signUpFormSchema>) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigate('/home');
      signUpForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignIn(data: z.infer<typeof signInFormSchema>) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/home');
      signInForm.reset();
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignInGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    const ok = confirm('로그아웃하시겠습니까?');
    if (ok) {
      await auth.signOut();
      navigate('/');
    }
  };

  return {
    signUpForm,
    signInForm,
    handleSignUp,
    handleSignIn,
    handleSignInGithub,
    handleSignOut,
  };
}
