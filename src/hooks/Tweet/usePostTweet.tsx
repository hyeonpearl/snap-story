import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const postTweetFormSchema = z.object({
  tweet: z
    .string()
    .min(5, {
      message: '5자 이상 작성해주세요.',
    })
    .max(100, {
      message: '100자 이하로 작성해주세요.',
    }),
});

export function usePostTweet() {
  const postTweetForm = useForm<z.infer<typeof postTweetFormSchema>>({
    resolver: zodResolver(postTweetFormSchema),
  });

  function onSubmit(data: z.infer<typeof postTweetFormSchema>) {
    console.log(data);
  }

  return { postTweetForm, onSubmit };
}
