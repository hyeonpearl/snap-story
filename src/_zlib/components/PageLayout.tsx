import { Icon } from './common/Icon';
import { Menu } from './common/Menu';
import { Wrapper } from './common/Wrapper';
import useSign from '../hooks/useSign';
import { Link, Outlet } from 'react-router-dom';

export default function PageLayout() {
  const { onSignOut } = useSign();

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
