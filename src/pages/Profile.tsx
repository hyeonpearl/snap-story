import { Icon } from '../_zlib/components/common/Icon';
import { Input } from '../_zlib/components/common/Input';
import { Spacing } from '../_zlib/components/common/Spacing';
import { Txt } from '../_zlib/components/common/Txt';
import { Wrapper } from '../_zlib/components/common/Wrapper';
import colors from '../_zlib/constants/colors';
import useProfile from '../_zlib/hooks/useProfile';

export default function Profile() {
  const { user, picture, createAt, onPictureChange } = useProfile();
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

      <Wrapper className='column'>
        <Txt typography={'h4'}>{user?.displayName ?? '익명'}</Txt>
        <Spacing direction={'vertical'} size={8} />

        <Wrapper className='profile-date'>
          <Icon.Calendar color={colors.gray02} />
          <Txt typography={'p'} color={colors.gray02}>
            가입일 : {createAt}
          </Txt>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}
