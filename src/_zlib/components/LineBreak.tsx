import styled from 'styled-components';
import { Txt } from './Txt';

interface Props {
  text: string;
}

export function LineBreak({ text, ...props }: Props) {
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
