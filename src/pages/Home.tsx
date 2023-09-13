import PostTweet from '../_zlib/components/PostTweet';
import { Wrapper } from '../_zlib/components/common/Wrapper';

export default function Home() {
  return (
    <Wrapper className='home'>
      <PostTweet />
    </Wrapper>
  );
}
