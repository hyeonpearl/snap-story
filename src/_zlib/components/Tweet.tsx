import { Icon } from './common/Icon';
import { Spacing } from './common/Spacing';
import { Txt } from './common/Txt';
import { Wrapper } from './common/Wrapper';
import { TweetType } from '../hooks/useTweets';
import { User } from 'firebase/auth';

interface Props extends TweetType {
  user?: User | null;
  onDelete: () => void;
}

export default function Tweet({
  photo,
  tweet,
  user,
  userId,
  username,
  onDelete,
}: Props) {
  return (
    <Wrapper className='tweet'>
      <Wrapper className='row-spacing'>
        <Txt typography={'name'}>{username}</Txt>
        {user?.uid === userId && (
          <Txt typography={'delete'} onClick={onDelete}>
            X
          </Txt>
        )}
      </Wrapper>
      <Spacing direction={'vertical'} size={10} />
      <Txt typography={'p'}>{tweet}</Txt>
      {photo && (
        <>
          <Wrapper className='column-center'>
            <Spacing direction={'vertical'} size={20} />
            <Icon className='upload' src={photo} width={550} height={550} />
          </Wrapper>
        </>
      )}
    </Wrapper>
  );
}
