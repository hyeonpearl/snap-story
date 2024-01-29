import { z } from 'zod';
import { auth } from '@/server/firebase';

export type SignUpType = z.infer<typeof SignUpFormSchema>;
export type SignInType = z.infer<typeof SignInFormSchema>;
export type SnapType = z.infer<typeof SnapFormSchema>;
export type ProfileNameType = z.infer<typeof ProfileFormNameSchema>;
export type ProfilePictureType = z.infer<typeof ProfileFormPictureSchema>;

const FILE_SIZE = 1024 * 1024;

const user = auth.currentUser;

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Please enter at least 2 characters.',
    })
    .max(20, {
      message: 'Please enter no more than 20 characters.',
    }),
  email: z
    .string()
    .min(1, {
      message: 'Please enter your email.',
    })
    .email({ message: 'Please follow the email format.' }),
  password: z
    .string()
    .min(6, {
      message: 'Please enter at least 6 characters.',
    })
    .max(16, {
      message: 'Please enter no more than 16 characters.',
    }),
});

const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Please enter your email.',
    })
    .email({ message: 'Please follow the email format.' }),
  password: z
    .string()
    .min(6, {
      message: 'Please enter at least 6 characters.',
    })
    .max(16, {
      message: 'Please enter no more than 16 characters.',
    }),
});

const SnapFormSchema = z.object({
  snap: z
    .string({ required_error: 'Please enter your snap.' })
    .min(3, {
      message: 'Please enter at least 3 characters.',
    })
    .max(300, {
      message: 'Please enter no more than 300 characters.',
    }),
  image: z
    .instanceof(File)
    .optional()
    .refine(file => file && file.size < FILE_SIZE, {
      message: 'Only files with a size of less than 1MB can be uploaded.',
    }),
});

const ProfileFormNameSchema = z.object({
  username: z
    .string({ required_error: 'Please enter your username.' })
    .min(2, {
      message: 'Please enter at least 2 characters.',
    })
    .max(20, {
      message: 'Please enter no more than 20 characters.',
    }),
});

const ProfileFormPictureSchema = z.object({
  image: z.instanceof(File).refine(file => file && file.size < FILE_SIZE, {
    message: 'Only files with a size of less than 1MB can be uploaded.',
  }),
});

export {
  FILE_SIZE,
  user,
  SignUpFormSchema,
  SignInFormSchema,
  SnapFormSchema,
  ProfileFormNameSchema,
  ProfileFormPictureSchema,
};
