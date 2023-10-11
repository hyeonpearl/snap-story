import { useEffect } from 'react';
import { Icon } from '../_zlib/components/common/Icon';
import { Input } from '../_zlib/components/common/Input';
import { Spacing } from '../_zlib/components/common/Spacing';
import { Txt } from '../_zlib/components/common/Txt';
import { Wrapper } from '../_zlib/components/common/Wrapper';
import TimeLine from '../_zlib/components/TimeLine';
import colors from '../_zlib/constants/colors';
import useProfile from '../_zlib/hooks/useProfile';

export default function Profile() {
  const { user, tweets, picture, creationTime, onPictureChange, fetchData } =
    useProfile();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Wrapper className='profile'>
      <Spacing direction={'vertical'} size={100} />
      <Input.Label className='profile' htmlFor='picture'>
        {picture ? (
          <Icon width={50} height={50} src={picture} />
        ) : (
          <Icon.Profile />
        )}
      </Input.Label>
      <Input
        onChange={onPictureChange}
        id='picture'
        type='file'
        accept='image/*'
      />
      <Spacing direction={'vertical'} size={16} />

      <Wrapper className='profile-info'>
        <Txt typography={'h4'}>{user?.displayName ?? '익명'}</Txt>
        <Spacing direction={'vertical'} size={4} />
        <Txt typography={'p'} color={colors.gray02}>
          @{user?.email}
        </Txt>
        <Spacing direction={'vertical'} size={20} />

        <Wrapper className='profile-date'>
          <Icon.Calendar color={colors.gray02} />
          <Txt typography={'p'} color={colors.gray02}>
            가입일 : {creationTime}
          </Txt>
        </Wrapper>
      </Wrapper>

      <TimeLine user={user} tweets={tweets} />
    </Wrapper>
  );
}
