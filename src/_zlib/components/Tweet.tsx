import { Icon } from './common/Icon';
import { Menu } from './common/Menu';
import { Spacing } from './common/Spacing';
import { Txt } from './common/Txt';
import { Wrapper } from './common/Wrapper';
import colors from '../constants/colors';
import { TweetType } from '../hooks/useTweets';
import { database, storage } from '../server/firebase';
import { User } from 'firebase/auth';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

interface Props extends TweetType {
  user?: User | null;
}

export default function Tweet({
  id,
  photo,
  tweet,
  user,
  userId,
  username,
}: Props) {
  const tweetRef = doc(database, 'tweets', id);

  /**
   * Tweet을 수정하는 함수.
   * 비즈니스 로직이라 이곳에 작성되면 안됨. 리팩토링 필요.
   * 사진 수정 기능도 추가해야함.
   */
  const onEdit = async () => {
    const edit = prompt('수정할 내용을 입력해주세요.', '');
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
      <Wrapper className='row-spacing'>
        <Txt typography={'bold'}>{username}</Txt>
        {user?.uid === userId && (
          <Menu>
            <Menu.Item className='tweet-control' onClick={onEdit}>
              <Icon.Edit color={colors.gray02} />
            </Menu.Item>
            <Menu.Item className='tweet-control' onClick={onDelete}>
              <Icon.Cancel color={colors.gray02} />
            </Menu.Item>
          </Menu>
        )}
      </Wrapper>
      {user?.uid !== userId && <Spacing direction={'vertical'} size={12} />}

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
