import styled from 'styled-components';
import { Txt } from './common/Txt';

interface Props {
  text: string;
}

export default function LineBreak({ text, ...props }: Props) {
  return (
    <StyledLineBreak {...props}>
      <hr />
      <Txt typography={'p'}>{text}</Txt>
      <hr />
    </StyledLineBreak>
  );
}

const StyledLineBreak = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & hr {
    width: 40%;
  }
`;
