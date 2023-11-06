import colors from '../../constants/colors';
import { styled } from 'styled-components';

interface Props {
  text: string;
}

export function LineBreak({ text, ...props }: Props) {
  return (
    <StyledLineBreak {...props}>
      <hr />
      <span>{text}</span>
      <hr />
    </StyledLineBreak>
  );
}

LineBreak.Hr = () => {
  return <StyledHr />;
};

const StyledLineBreak = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & hr {
    width: 40%;
  }
`;

const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  border: 0;
  background: ${colors.gray01};
`;
