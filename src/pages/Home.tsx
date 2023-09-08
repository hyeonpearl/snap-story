import { auth } from '../_zlib/server/firebase';

export default function Home() {
  // 로그아웃 테스트
  const signOut = () => {
    auth.signOut();
  };
  return <button onClick={signOut}>로그아웃</button>;
}
