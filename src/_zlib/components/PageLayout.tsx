import { Icon } from './common/Icon';
import { Menu } from './common/Menu';
import { Wrapper } from './common/Wrapper';
import { auth } from '../server/firebase';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function PageLayout() {
  const navigate = useNavigate();

  /**
   * 로그아웃 함수.
   * 비즈니스 로직이라 이곳에 작성되면 안됨. 리팩토링 필요.
   */
  const onSignOut = async () => {
    const ok = confirm('로그아웃하시겠습니까?');
    if (ok) {
      await auth.signOut();
      navigate('/signin');
    }
  };

  return (
    <Wrapper className='navbar'>
      <Menu className='column'>
        <Menu.Item className='navbar'>
          <Link to={'/home'}>
            <Icon src='/z.svg' width={30} height={30} />
          </Link>
        </Menu.Item>
        <Menu.Item className='navbar'>
          <Link to={'/home'}>
            <Icon.Home />
          </Link>
        </Menu.Item>
        <Menu.Item className='navbar'>
          <Link to={'/profile'}>
            <Icon.Profile />
          </Link>
        </Menu.Item>
        <Menu.Item className='navbar' onClick={onSignOut}>
          <Icon.SignOut />
        </Menu.Item>
      </Menu>
      <Outlet />
    </Wrapper>
  );
}
