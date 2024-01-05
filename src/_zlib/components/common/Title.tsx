import { Txt } from './Txt';
import { Wrapper } from './Wrapper';

export default function Title({ title }: { title: string }) {
  return (
    <Wrapper className='title'>
      <Txt typography='h4'>{title}</Txt>
    </Wrapper>
  );
}
