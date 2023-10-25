import { Txt } from './common/Txt';
import { Wrapper } from './common/Wrapper';

export default function Title({ title }: { title: string }) {
  return (
    <Wrapper className='title'>
      <Txt typography='h4'>{title}</Txt>
    </Wrapper>
  );
}
