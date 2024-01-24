import { z } from 'zod';

const FILE_SIZE = 1024 * 1024;

const TweetFormSchema = z.object({
  tweet: z
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

export { FILE_SIZE, TweetFormSchema };
