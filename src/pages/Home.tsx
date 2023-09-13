import { Wrapper } from '../_zlib/components/common/Wrapper';
import PostTweet from '../_zlib/components/PostTweet';

export default function Home() {
  return (
    <Wrapper className='home'>
      <PostTweet />
    </Wrapper>
  );
}
