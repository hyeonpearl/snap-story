import { z } from 'zod';

export type SignUpType = z.infer<typeof SignUpFormSchema>;
export type SignInType = z.infer<typeof SignInFormSchema>;
export type SnapType = z.infer<typeof SnapFormSchema>;

const FILE_SIZE = 1024 * 1024;

const SignUpFormSchema = z.object({
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
const SignInFormSchema = z.object({
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
const SnapFormSchema = z.object({
  snap: z
    .string({ required_error: '포스트를 작성해주세요.' })
    .min(5, {
      message: '5자 이상 작성해주세요.',
    })
    .max(100, {
      message: '100자 이하로 작성해주세요.',
    }),
  image: z
    .instanceof(File)
    .optional()
    .refine(file => file && file.size < FILE_SIZE, {
      message: '1MB 미만 크기의 파일만 업로드 가능합니다.',
    }),
});

export { FILE_SIZE, SignUpFormSchema, SignInFormSchema, SnapFormSchema };
