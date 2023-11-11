import { Icon } from './common/Icon';
import { Menu } from './common/Menu';
import { Spacing } from './common/Spacing';
import { Txt } from './common/Txt';
import { Wrapper } from './common/Wrapper';
import colors from '../constants/colors';
import { TweetType } from '../hooks/useTweets';
import { db, storage } from '../server/firebase';
import { User } from 'firebase/auth';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

interface Props extends TweetType {
  user?: User | null;
}

export default function Tweet({
  id,
  postedAt,
  photo,
  tweet,
  user,
  userId,
  username,
  userEmail,
  profilePicture,
}: Props) {
  const tweetRef = doc(db, 'tweets', id);

  /**
   * Tweet을 수정하는 함수.
   * 비즈니스 로직이라 이곳에 작성되면 안됨. 리팩토링 필요.
   * 사진 수정 기능도 추가해야함.
   */
  const onEdit = async () => {
    const edit = prompt('수정할 내용을 입력해주세요.', tweet);
    if (edit === '') return;
    await updateDoc(tweetRef, {
      tweet: edit,
    });
  };
  /**
   * Tweet을 삭제하는 함수.
   * 비즈니스 로직이라 이곳에 작성되면 안됨. 리팩토링 필요.
   */
  const onDelete = async () => {
    const ok = confirm('트윗을 삭제하시겠습니까?');
    if (!ok || user?.uid !== userId) return;

    try {
      await deleteDoc(tweetRef);
      if (photo) {
        const photoRef = ref(storage, `tweets/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className='tweet'>
      <Wrapper>
        {profilePicture ? (
          <Icon src={profilePicture} width={40} height={40} />
        ) : (
          <Icon.Profile type='fill' />
        )}
      </Wrapper>
      <Wrapper className='column'>
        <Wrapper className='row-spacing'>
          <Wrapper className='row'>
            <Txt typography={'bold'}>{username}</Txt>
            <Spacing direction={'horizontal'} size={5} />
            <Txt typography={'p'} color={colors.gray02}>
              {userEmail} • {postedAt.month}월 {postedAt.day}일
            </Txt>
          </Wrapper>
          {user?.uid === userId && (
            <Menu>
              <Menu.Item className='tweet-control' onClick={onEdit}>
                <Icon.Edit type={'stroke'} color={colors.gray02} />
              </Menu.Item>
              <Menu.Item className='tweet-control' onClick={onDelete}>
                <Icon.Delete type={'stroke'} color={colors.gray02} />
              </Menu.Item>
            </Menu>
          )}
        </Wrapper>
        <Spacing direction={'vertical'} size={8} />

        <Wrapper className='row'>
          <Txt typography={'p'}>{tweet}</Txt>
        </Wrapper>
        {photo && (
          <>
            <Wrapper className='column-center'>
              <Spacing direction={'vertical'} size={20} />
              <Icon className='upload' src={photo} width={1} height={1} />
            </Wrapper>
          </>
        )}
      </Wrapper>
    </Wrapper>
  );
}
