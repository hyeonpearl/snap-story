import { useState } from 'react';

export default function usePostTweet() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) setFile(files[0]);
  };

  return { isLoading, tweet, file, onChange, onFileChange };
}
