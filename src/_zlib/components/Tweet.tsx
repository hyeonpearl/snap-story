import { Icon } from './common/Icon';
import { Spacing } from './common/Spacing';
import { Txt } from './common/Txt';
import { Wrapper } from './common/Wrapper';
import { TweetType } from '../hooks/useLoadTweets';

export default function Tweet({ username, photo, tweet }: TweetType) {
  return (
    <Wrapper className='tweet'>
      <Txt typography='name'>{username}</Txt>
      <Spacing direction='vertical' size={10} />
      <Txt typography='p'>{tweet}</Txt>
      {photo && (
        <>
          <Wrapper className='column-center'>
            <Spacing direction='vertical' size={20} />
            <Icon className='upload' src={photo} width={550} height={550} />
          </Wrapper>
        </>
      )}
    </Wrapper>
  );
}
