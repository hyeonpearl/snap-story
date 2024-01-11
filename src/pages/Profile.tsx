import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';
import { Input } from '../components/common/Input';
import { Spacing } from '../components/common/Spacing';
import { Txt } from '../components/common/Txt';
import { Wrapper } from '../components/common/Wrapper';
import TimeLine from '../components/tweet/TimeLine';
import Title from '../components/common/Title';
import colors from '../constants/colors';
import useProfile from '../hooks/useProfile';
import useTweets from '../hooks/useTweets';

export default function Profile() {
  const { tweets, updateProfilePicture } = useTweets('userId');
  const { user, profile, handleNameChange, handlePictureChange } =
    useProfile(updateProfilePicture);

  return (
    <Wrapper className='page'>
      <Title title='프로필' />
      <Spacing direction='vertical' size={30} />
      <Wrapper className='row'>
        <Spacing direction='horizontal' size={30} />
        <Input.Label className='profile' htmlFor='picture'>
          {profile.profilePicture ? (
            <Icon width={50} height={50} src={profile.profilePicture} />
          ) : (
            <Icon.Profile type='fill' />
          )}
        </Input.Label>
        <Input
          onChange={handlePictureChange}
          id='picture'
          type='file'
          accept='image/*'
        />
      </Wrapper>

      <Wrapper className='profile-info'>
        <Wrapper className='profile-detail'>
          <Wrapper className='row-spacing'>
            <Txt typography='h4'>{profile.username ?? '익명'}</Txt>
            <Button className='secondary' onClick={handleNameChange}>
              이름 변경
            </Button>
          </Wrapper>

          <Txt typography='p' color={colors.gray02}>
            @{profile.email?.split('@')[0]}
          </Txt>
          <Spacing direction='vertical' size={20} />

          <Wrapper className='profile-date'>
            <Icon.Calendar type='stroke' color={colors.gray02} />
            <Txt typography='p' color={colors.gray02}>
              가입일 : {profile.creationTime}
            </Txt>
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <TimeLine user={user} tweets={tweets} />
    </Wrapper>
  );
}
