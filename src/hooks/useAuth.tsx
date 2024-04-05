import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/server/firebase';
import {
  SignUpType,
  SignUpFormSchema,
  SignInType,
  SignInFormSchema,
} from '@/lib/schema';

export function useAuth() {
  const navigate = useNavigate();
  const signUpForm = useForm<SignUpType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const signInForm = useForm<SignInType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleSignUp(data: SignUpType) {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(credential.user, { displayName: data.username });
      navigate('/home');
      signUpForm.reset();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSignIn(data: SignInType) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/home');
      signInForm.reset();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSignInGithub() {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSignOut() {
    await auth.signOut();
    navigate('/');
  }
  async function onDeleteAccount() {
    if (!auth.currentUser) return;

    await deleteUser(auth.currentUser);
    navigate('/');
  }

  return {
    signUpForm,
    signInForm,
    handleSignUp,
    handleSignIn,
    handleSignInGithub,
    handleSignOut,
    onDeleteAccount,
  };
}
