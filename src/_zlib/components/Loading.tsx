import { Txt } from './common/Txt';
import { Wrapper } from './common/Wrapper';

export default function Loading() {
  return (
    <Wrapper className='loading'>
      <Txt typography={'h4'}>Loading...</Txt>
    </Wrapper>
  );
}
