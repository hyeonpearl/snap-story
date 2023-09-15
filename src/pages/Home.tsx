import { Wrapper } from '../_zlib/components/common/Wrapper';
import PostTweet from '../_zlib/components/PostTweet';
import TimeLine from '../_zlib/components/TimeLine';

export default function Home() {
  return (
    <Wrapper className='home'>
      <PostTweet />
      <TimeLine />
    </Wrapper>
  );
}
