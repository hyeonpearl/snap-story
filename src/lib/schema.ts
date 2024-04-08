import { z } from 'zod';

export type SignUpType = z.infer<typeof SignUpFormSchema>;
export type SignInType = z.infer<typeof SignInFormSchema>;
export type SnapType = z.infer<typeof SnapFormSchema>;
export type ProfileNameType = z.infer<typeof ProfileFormNameSchema>;
export type ProfilePictureType = z.infer<typeof ProfileFormPictureSchema>;

const FILE_SIZE = 1024 * 1024;

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: '최소 2자 이상으로 작성해주세요.',
    })
    .max(20, {
      message: '최대 20자 이하로 작성해주세요.',
    }),
  email: z
    .string()
    .min(1, {
      message: '이메일을 작성해주세요.',
    })
    .email({ message: '이메일 형식에 맞춰 작성해주세요.' }),
  password: z
    .string()
    .min(6, {
      message: '최소 6자 이상으로 작성해주세요.',
    })
    .max(16, {
      message: '최대 16자 이하로 작성해주세요.',
    }),
});

const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: '이메일을 작성해주세요.',
    })
    .email({ message: '이메일 형식에 맞춰 작성해주세요.' }),
  password: z
    .string()
    .min(6, {
      message: '최소 6자 이상으로 작성해주세요.',
    })
    .max(16, {
      message: '최대 16자 이하로 작성해주세요.',
    }),
});

const SnapFormSchema = z.object({
  snap: z
    .string({ required_error: '내용을 작성해주세요.' })
    .min(3, {
      message: '최소 3자 이상으로 작성해주세요.',
    })
    .max(300, {
      message: '최대 300자 이하로 작성해주세요.',
    }),
  image: z
    .instanceof(File)
    .optional()
    .refine(file => file && file.size < FILE_SIZE, {
      message: '1MB 이하 크기의 파일만 업로드할 수 있습니다.',
    }),
});

const ProfileFormNameSchema = z.object({
  username: z
    .string({ required_error: '사용하실 이름을 작성해주세요.' })
    .min(2, {
      message: '최소 2자 이상으로 작성해주세요.',
    })
    .max(20, {
      message: '최대 20자 이하로 작성해주세요.',
    }),
});

const ProfileFormPictureSchema = z.object({
  image: z.instanceof(File).refine(file => file && file.size < FILE_SIZE, {
    message: '1MB 이하 크기의 파일만 업로드할 수 있습니다.',
  }),
});

export {
  FILE_SIZE,
  SignUpFormSchema,
  SignInFormSchema,
  SnapFormSchema,
  ProfileFormNameSchema,
  ProfileFormPictureSchema,
};
