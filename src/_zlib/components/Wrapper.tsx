import { css, styled } from 'styled-components';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: string;
}

export function Wrapper({ type, ...props }: Props) {
  return <StyledWrapper type={type} {...props} />;
}

const StyledWrapper = styled.div<Props>`
  height: 100vh;
  display: flex;
  justify-content: center;

  ${({ type }) =>
    type === 'form' &&
    css`
      margin-top: 50px;
      flex-direction: column;
      align-items: center;
      width: 420px;
    `}
`;
