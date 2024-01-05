import { Txt } from './Txt';
import { Wrapper } from './Wrapper';

export default function Loading({ text }: { text?: string }) {
  return (
    <Wrapper className='loading'>
      <Txt typography='h4'>{text ? text : '불러오는 중...'}</Txt>
    </Wrapper>
  );
}
